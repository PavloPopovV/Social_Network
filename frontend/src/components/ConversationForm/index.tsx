import { useForm } from "react-hook-form"
import Input from "../../ui/Input"
import PrimaryButton from "../../ui/PrimaryButton"
import { useMessageActions } from "../../hooks/useMessageActions"
import { useParams } from "react-router-dom"


export type MessageFormValue = {
  message: string
}

const ConversationForm = () => {
  const {id} = useParams<{id:string}>()
  const {fetchSendMessage} = useMessageActions(id || "")
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = (message: MessageFormValue) => {
    fetchSendMessage(message.message, reset)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between gap-x-2">
      <div className="w-full">
        <Input
          name="comment"
          placeholder="Add message.."
          type="text"
          register={register("message", {
            required: "This field cannot be empty",
          })}
        />
      </div>
      <PrimaryButton
        type="submit"
        text="Send"
        className="bg-blue-600 w-[180px] py-3 px-3"
      />
    </form>
  )
}

export default ConversationForm
