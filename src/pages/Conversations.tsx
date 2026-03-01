import messageData from '../mocks/messages.json';
const Conversations = () => {
  const messages = messageData;
  console.log(messages);

  const getConversations = () => {
    // const conversations = [];
    return [1];
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-20 px-4 pb-10">
      <div className="max-w-300 mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Mensajes</h2>
        {
          getConversations().map(conversations => (
            <div>{conversations}</div>
          ))
        }
      </div>
    </div>

  )
}
export default Conversations;