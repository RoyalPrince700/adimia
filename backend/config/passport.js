const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel.js');
const { generateToken } = require('../middleware/auth.js');
const { sendWelcomeEmail } = require('../mailtrap/emails.js');
const { getGoogleOAuthCallbackUrl } = require('./envUrls.js');

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Google redirects to the backend callback; URL comes from BACKEND_URL / RENDER / Vercel (see envUrls)
      callbackURL: getGoogleOAuthCallbackUrl(),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('🔄 [Passport] Google profile received:', {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0].value
        });

        // Check if user exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          console.log('🔄 [Passport] Creating new user...');
          // Create new user
          user = await User.create({
            email: profile.emails[0].value,
            fullName: profile.displayName,
            avatarUrl: profile.photos[0].value,
            role: 'GENERAL', // Changed from userType: 'photographer' to match existing role enum
            isVerified: true, // Google accounts are pre-verified
          });
          console.log('✅ [Passport] New user created:', user._id);
          console.log('[PRODUCTION GOOGLE] 🚀 About to trigger welcome email for new user:', user.email);

          // Send welcome email for first-time Google signup (non-blocking)
          console.log('[GOOGLE SIGNUP] 📧 Sending welcome email to new Google user:', user.email);
          try {
            const recipientEmail = user.email;
            const recipientName = user.fullName || 'there';
            console.log('[GOOGLE SIGNUP] 👤 User details - Email:', recipientEmail, 'Name:', recipientName);

            // Send email synchronously to ensure it's logged properly
            sendWelcomeEmail(recipientEmail, recipientName)
              .then((result) => {
                console.log('[GOOGLE SIGNUP] ✅ Welcome email sent successfully to', recipientEmail, 'Result:', result?.messageId || 'OK');
              })
              .catch(err => {
                console.error('[GOOGLE SIGNUP] ❌ Failed to send welcome email to', recipientEmail, 'Error:', err.message);
                console.error('[GOOGLE SIGNUP] ❌ Full error details:', err);
              });
          } catch (e) {
            console.error('[GOOGLE SIGNUP] ❌ Error triggering welcome email for', user.email, 'Error:', e);
          }
        } else {
          console.log('🔄 [Passport] Existing user found, checking avatar...');
          // Update user's Google info if needed
          if (!user.avatarUrl && profile.photos[0].value) {
            console.log('🔄 [Passport] Updating user avatar...');
            user.avatarUrl = profile.photos[0].value;
            await user.save();
          }
        }

        console.log('🔄 [Passport] Generating JWT token...');
        // Generate JWT token
        const token = generateToken(user._id);
        console.log('✅ [Passport] Token generated:', !!token);

        // Return user and token
        return done(null, { user, token });
      } catch (error) {
        console.error('❌ [Passport] Error in Google strategy:', error);
        return done(error, null);
      }
    }
  )
);

// Serialize user for session (though we're not using sessions)
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

