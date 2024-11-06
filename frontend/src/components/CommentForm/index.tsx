import { useForm } from "react-hook-form"
import Input from "../../ui/Input"
import PrimaryButton from "../../ui/PrimaryButton"
import { useCreateComment } from "../../hooks/useCreateComment"
import { useParams } from "react-router-dom"

export type CommentFormValue = {
  content: string
}

const CommentForm = () => {
  const { id:postId } = useParams<{ id: string }>()
  const { fetchCreateComment } = useCreateComment(postId || "")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = (content: CommentFormValue) => {
    fetchCreateComment(content)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-end items-center gap-x-4 mb-4"
    >
      <div className="w-full">
        <Input
          name="comment"
          placeholder="Add comment.."
          type="text"
          register={register("content", {
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

export default CommentForm
