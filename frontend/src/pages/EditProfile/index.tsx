import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/slices/userSlice"
import { useEditProfile } from "../../hooks/useEditProfile"
import { ProfileEdit } from "../../app/services/usersApi"
import { User } from "../../app/types"
import PrimaryButton from "../../ui/PrimaryButton"
import Input from "../../ui/Input"


const EditProfile = () => {
  const current = useSelector(selectCurrent) as User
  const { fetchEditUser } = useEditProfile();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      bio: "",
      location: "",
    },
  })

  const onSubmit = (data: ProfileEdit) => {
    fetchEditUser(current?._id, data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center bg-gray-800 py-10 px-10 rounded-xl w-full"
    >
      <h1 className="text-[30px] mb-4">Edit profile info</h1>
      <div className="w-[400px] mb-5 flex flex-col gap-y-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={register("email", {
            required: "This field cannot be empty",
          })}
          error={errors.email?.message}
        />
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          register={register("firstName", {
            required: "This field cannot be empty",
          })}
          error={errors.firstName?.message}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
          register={register("lastName", {
            required: "This field cannot be empty",
          })}
          error={errors.lastName?.message}
        />
        <Input
          type="text"
          name="bio"
          placeholder="Your bio"
          register={register("bio", { required: "This field cannot be empty" })}
          error={errors.bio?.message}
        />
        <Input
          type="text"
          name="location"
          placeholder="Location"
          register={register("location", {
            required: "This field cannot be empty",
          })}
          error={errors.location?.message}
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

export default EditProfile
