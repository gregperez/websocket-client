import {Manager, Socket} from "socket.io-client";

export const connectToServer = (/*url: string*/) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

  const socket = manager.socket('/');

  addListeners(socket);

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

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
  const serverClientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;

  socket.on('connect', () => {
      serverStatusLabel.innerHTML = 'Online';
  });

  socket.on('disconnect', () => {
      serverStatusLabel.innerHTML = 'Offline';
  });

  socket.on('clients-updated', (clients: string[]) => {
      let clientsHtml = '';
      clients.forEach(clientId => {
          clientsHtml += `<li>${clientId}</li>`
      })
      serverClientsUl.innerHTML = clientsHtml;
  });
}
