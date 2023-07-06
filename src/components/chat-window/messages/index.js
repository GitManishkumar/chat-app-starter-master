import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');
    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

const handleAdmin=useCallback(async(uid)=>{
  const adminRef=database.ref(`/rooms/${chatId}/admin`)

  let alertMsg

  await adminRef.transaction(admin=>{
    if(admin){
      if(admin[uid]){
        admin[uid]=null
        alertMsg='Admin permission removed'
      }else{
        admin[uid]=true
        alertMsg='Admin permission grant'
      }
    }
    return admin
  })
  Alert.info(alertMsg,4000)
},[chatId])


  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages &&
        messages.map(msg => <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} />)}
    </ul>
  );
};

export default Messages;
