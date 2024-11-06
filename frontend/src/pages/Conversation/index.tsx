import ConversationForm from '../../components/ConversationForm'
import MessagesList from '../../components/MessagesList'


const Conversation = () => {
  return (
    <div className='w-[100%] '>
      <MessagesList/>
      <ConversationForm/>
    </div>
  )
}

export default Conversation
