/**
 * Not mounted from App while Socket.IO is disabled. Kept for easy restore
 * (re-add SocketProvider in App.jsx and uncomment io() below).
 */
import React, { createContext, useContext } from 'react';
// import { io } from 'socket.io-client';
// import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

/**
 * Socket.IO client disabled (no WebSocket) — `socket` is always null.
 * Re-enable by restoring the io() + useEffect logic from version control.
 */
export const SocketProvider = ({ children }) => {
    // const [socket, setSocket] = useState(null);
    // const [isConnected, setIsConnected] = useState(false);
    // const user = useSelector((state) => state?.user?.user);
    // useEffect(() => { ... io(backendBase) ... }, [user?._id]);

    const value = {
        socket: null,
        isConnected: false,
        userId: null,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
