const userModel = require('../../models/userModel');

const SAFE_SELECT =
  '-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt';

async function updateProfile(req, res) {
  try {
    const userId = req.userId;
    const { fullName, location, phone } = req.body;

    const updates = {};
    if (fullName !== undefined) {
      const v = String(fullName).trim();
      if (v.length > 120) {
        return res.status(400).json({ success: false, message: 'Name is too long' });
      }
      updates.fullName = v;
    }
    if (location !== undefined) {
      const v = String(location).trim();
      if (v.length > 200) {
        return res.status(400).json({ success: false, message: 'Location is too long' });
      }
      updates.location = v || 'Not Specified';
    }
    if (phone !== undefined) {
      const v = String(phone).trim().replace(/\s/g, '');
      if (v.length > 20) {
        return res.status(400).json({ success: false, message: 'Phone is too long' });
      }
      updates.phone = v;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    const user = await userModel
      .findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true })
      .select(SAFE_SELECT);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      error: false,
      message: 'Profile updated',
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || 'Update failed',
    });
  }
}

module.exports = updateProfile;
