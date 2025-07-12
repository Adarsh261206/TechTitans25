import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Change if backend uses a different port

type SocketContextType = ReturnType<typeof io>;

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
};
