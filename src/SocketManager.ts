import { io, Socket } from "socket.io-client";

class SocketManager {
  private static instance: Socket;

  static getInstance(url: string, options: any): Socket {
    if (!SocketManager.instance) {
      SocketManager.instance = io(url, options);
    }
    return SocketManager.instance;
  }

  static disconnect() {
    if (SocketManager.instance) {
      SocketManager.instance.disconnect();
      SocketManager.instance = null as any;
    }
  }
}

export default SocketManager;
