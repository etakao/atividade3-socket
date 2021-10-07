import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';
import { useContacts } from '../../contexts/ContactsProvider';
import { useConversations } from '../../contexts/ConversationsProvider';
import { useMainUser } from '../../contexts/MainUserProvider';

import './styles.scss';

function Login({ setUser }) {
  const { mainUser, setMainUser } = useMainUser();
  const { createContact } = useContacts();
  const { createConversation } = useConversations();

  const [name, setName] = useState("");

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (!mainUser) {
      setMainUser(name, uuid());
    } else {
      createContact(name, uuid());
      createConversation(mainUser.name);
    }

    setUser(name, uuid());

    history.push('/chat');
  }

  return (
    <div className="login-container">
      <h2>Socket Chat</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <footer>
          <button type="submit">Entrar</button>
        </footer>
      </form>
    </div>
  );
}

export default Login;
