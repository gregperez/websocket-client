import {Manager} from "socket.io-client";

export const connectToServer = (/*url: string*/) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

  const socket = manager.socket('/');

  console.log('socket', socket);

  // Copilot generated this code
  /*const socket = io(url);
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  return socket;*/
}
