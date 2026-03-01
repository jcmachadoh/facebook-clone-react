import { useParams } from "react-router-dom";
import { Send, Phone, Video, Info } from "lucide-react";

import type { Contact, ConversationData } from "../../interfaces/types";
import contactsData from '../../mocks/contacts.json';
import conversationsData from '../../mocks/conversations.json';

const Messages = () => {
  const { id } = useParams();

  // ¡MAGIA PURA! Cálculo derivado directo (Sin useState, sin useEffect)
  // Cada vez que el 'id' cambie en la URL, React volverá a ejecutar estas dos líneas al vuelo.
  const contact = (contactsData as Contact[]).find(c => c.id === id) || null;
  const conversation = (conversationsData as ConversationData[]).find(conv => conv.contactId === id) || null;

  // Si el contacto no existe, mostramos un mensaje de error
  if (!contact) {
    return (
      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 flex justify-center">
        <p className="text-gray-500">Selecciona una conversación válida.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-14 flex justify-center">

      {/* Contenedor principal del chat (tipo tarjeta) */}
      <div className="w-full max-w-200 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 shadow-sm flex flex-col border-x border-gray-200 dark:border-gray-700">

        {/* CABECERA DEL CHAT */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={contact.avatarUrl} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
              {contact.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 leading-tight">{contact.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{contact.isOnline ? 'Activo ahora' : 'Desconectado'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-blue-600 dark:text-blue-500">
            <Phone className="w-5 h-5 cursor-pointer" />
            <Video className="w-6 h-6 cursor-pointer" />
            <Info className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* ÁREA DE MENSAJES (Con scroll) */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900/50">
          {conversation?.messages ? (
            conversation.messages.map((msg) => {
              const isMe = msg.senderId === 'me';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                    }`}>
                    <p className="text-[15px]">{msg.text}</p>
                    <span className={`text-[11px] block mt-1 ${isMe ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No hay mensajes anteriores.</p>
            </div>
          )}
        </div>

        {/* CAJA DE TEXTO PARA ENVIAR */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
            />
            <Send className="w-5 h-5 text-blue-600 dark:text-blue-500 cursor-pointer" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Messages;