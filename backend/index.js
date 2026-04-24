const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');
const router = require('./routes');
const { createServer } = require('http');
// WebSocket (Socket.IO) disabled — see ./config/socket.js
// const initializeSocket = require('./config/socket');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if unable to connect
    });

const { getAllowedCorsOrigins } = require('./config/envUrls.js');

const app = express();
const server = createServer(app);

// const io = initializeSocket(server);
const io = null;

// Middleware
const allowedCorsOrigins = getAllowedCorsOrigins();
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedCorsOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Additional CORS headers middleware (backup)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedCorsOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// if (io) app.set('io', io);
app.use("/api", router);

// Start the server
const PORT = process.env.PORT || 8080;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
