import React, { useEffect, useState } from "react";
import { CardContent } from "@material-ui/core";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { orderBy } from "lodash";

function ChatRouter({
  messages,
  user,
  typingUsers,
  sendMessage,
  sendTyping,
  fetchedMessages,
  isOnline,
  activeChat,
  receiver,
  socketReceiver
}) {
  const [oldMessages, setOldMessages] = useState([]);

  useEffect(() => {
    const orderedMessages = orderBy(fetchedMessages, ["createdAt"], ["asc"]);
    console.log(receiver.username, orderedMessages);

    const messagesFormated = orderedMessages.map(mes => {
      return {
        id: mes.uuid,
        message: mes.message,
        receiverId: mes.receiver_id,
        senderId: mes.sender_id,
        receiver: mes.receiver_id === user.id ? user.name : receiver.username,
        sender: mes.sender_id === user.id ? user.name : receiver.username
      };
    });
    console.log(receiver.username, messagesFormated);
    setOldMessages(messagesFormated);
  }, [fetchedMessages]);

  return (
    <>
      <CardContent>
        <Messages
          oldMessages={oldMessages}
          newMessages={messages}
          user={user}
          typingUsers={typingUsers}
          isOnline={isOnline}
        />
      </CardContent>
      <MessageInput
        sendMessage={message => sendMessage(message)}
        sendTyping={isTyping => sendTyping(activeChat.id, isTyping)}
        isOnline={isOnline}
      />
    </>
  );
}

export default ChatRouter;
