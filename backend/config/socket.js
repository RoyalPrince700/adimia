/**
 * Socket.IO is disabled. To restore: uncomment the block below and wire
 * `initializeSocket` in `backend/index.js` again.
 */

/* DISABLED – Socket.IO server
const { Server } = require('socket.io');
const { getAllowedCorsOrigins } = require('./envUrls.js');

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: getAllowedCorsOrigins(),
            credentials: true,
        }
    });

    // Handle WebSocket connections
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Join user-specific room for targeted updates
        socket.on('join-user-room', (userId) => {
            socket.join(`user_${userId}`);
            console.log(`User ${userId} joined room user_${userId}`);
        });

        // Join admin room for admin notifications
        socket.on('join-admin-room', () => {
            socket.join('admin_room');
            console.log('Admin joined admin_room');
        });

        // Listen for order status updates
        socket.on('order-status-updated', (data) => {
            console.log('Order status updated:', data);

            // Emit to specific user room
            io.to(`user_${data.userId}`).emit('order-status-changed', {
                orderId: data.orderId,
                newStatus: data.newStatus,
                message: data.message
            });

            // Emit to admin room for admin notifications
            io.to('admin_room').emit('admin-order-status-changed', {
                orderId: data.orderId,
                newStatus: data.newStatus,
                userId: data.userId
            });
        });

        // Example: Listen for a notification event
        socket.on('send-notification', (data) => {
            console.log('Notification received:', data);

            // Broadcast the notification to all connected clients
            io.emit('new-notification', data);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = initializeSocket;
*/

module.exports = function initializeSocketDisabled() {
    return null;
};
