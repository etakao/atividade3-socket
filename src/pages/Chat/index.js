import React, { useCallback, useState } from 'react';

import { useConversations } from '../../contexts/ConversationsProvider';

import './styles.scss';

function Chat({ name }) {
  const {
    conversations,
    selectConversationIndex,
    sendMessage,
    selectedConversation
  } = useConversations();

  const [text, setText] = useState("");
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  // function pad(s) { /* Completa com zeros numeros com 1 digito */
  //   return (s < 10) ? '0' + s : s;
  // }

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipent.map(r => r.id),
      text
    );

    setText("");
  }

  return (
    <div className="chat-container">
      <aside>
        <h3>Usuário: {name}</h3>
        <span>Conversas:</span>
        {conversations.map((conversation, index) => (
          <div key={index} onClick={() => selectConversationIndex(index)}>
            <h3 className={conversation.selected ? "active" : ""}>
              {conversation.recipent.map(r => r.name).join(', ')}
            </h3>
          </div>
        ))}
      </aside>

      <section>
        <h2>Chat</h2>

        <div className="chat-messages">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index;
            return (
              <div key={index} ref={lastMessage ? setRef : null} className={
                message.fromMe ?
                  "message-container me" :
                  "message-container"
              }>
                <h3>{message.fromMe ? "You:" : message.senderName}</h3>
                <span>{message.text}</span>
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default Chat;