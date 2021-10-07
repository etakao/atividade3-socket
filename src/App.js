import React from 'react';

import { SocketProvider } from './contexts/SocketProvider';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { MainUserProvider } from './contexts/MainUserProvider';
import Login from './pages/Login';
import Chat from './pages/Chat';
import useLocalStorage from './hooks/useLocalStorage';

import './styles/global.scss';

function App() {
  const [id, setId] = useLocalStorage('id');
  const [name, setName] = useLocalStorage('name');

  function setUser(userId, userName) {
    setId(userId);
    setName(userName);
  }

  const chat = (
    <MainUserProvider>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Chat name={name} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider >
    </MainUserProvider>
  )

  return (
    id ? (
      chat
    ) : (
      <Login setUser={setUser} />
    )
  );
}

export default App;
