import {Manager, Socket} from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: `${token}`
    },
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');

  addListeners();

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

const addListeners = () => {
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverClientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;

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

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit('message-from-client', {
        id: 'YO!!',
        message: messageInput.value
    });
    messageInput.value = '';
  });

  socket.on('messages-from-server', (payload: { fullName: string, message: string }) => {
    const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>`;

    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);
  });
}
