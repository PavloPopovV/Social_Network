import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/slices/userSlice"
import { usePostActions } from "../../hooks/usePostActions"
import { User } from "../../app/types"
import Input from "../../ui/Input"
import PrimaryButton from "../../ui/PrimaryButton"
import { useParams } from "react-router-dom"

export type PostFormValue = {
  content: string
}

export type PostFormType = "create" | "edit"

export type PostListProps = {
  type: PostFormType
}

const PostForm = ({ type }: { type: PostFormType }) => {
  const {id:postId} = useParams<{id:string}>()
  const current = useSelector(selectCurrent) as User
  const { fetchCreatePost, fetchEditPost } = usePostActions( )

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

  const onSubmit = (content: PostFormValue) => {
    type === 'create' ?  fetchCreatePost(content) : fetchEditPost(content, postId || "")
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center bg-gray-800 py-10 px-10 rounded-xl w-[600px]"
    >
      <h1 className="text-[30px] mb-4">
        {type === "create" ? "Create new post" : "Edit post"}
      </h1>
      <div className="w-[400px] mb-5">
        <Input
          type="text"
          name="post"
          placeholder={type === "create" ? "Add post" : "Edit post"}
          register={register("content", {
            required: "This field cannot be empty",
          })}
          error={errors.content?.message}
        />
      </div>

      <PrimaryButton
        type="submit"
        text="Submit"
        className="bg-blue-600 w-[150px]"
      />
    </form>
  )
}

export default PostForm
