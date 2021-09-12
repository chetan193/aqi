import { app } from '../config/app';
let socket;

export const initiateSocket = () => {
  socket = new WebSocket(app.socket_server_url);
};

export const subscribe = (cbk) => {
  if (!socket) {
    initiateSocket();
  }

  socket.onmessage = (event) => {
    return cbk(null, JSON.parse(event.data));
  };
};
