import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import { PATHS } from '../../constantes/paths';
import { User } from "../../app/types";
import { useAuth } from "../../hooks/useAuth";
import PrimaryButton from '../../ui/PrimaryButton';
import Input from "../../ui/Input";


export type UserRegistration = Pick<User, "email" | "password" | "firstName" | "lastName">;

const FormRegistration = () => {
  const { fetchAuth } = useAuth('register');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email:"",
      firstName: "",
      lastName: "",
      password:"",
    },
  });

  const onSubmit = (data: UserRegistration) => {
    console.log(data)
    fetchAuth(data)
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center w-[450px] bg-gray-800 py-10 px-10 rounded-xl' >
      <h1 className='text-[30px] mb-4'>Registration</h1>
      <div className="w-full mb-2 flex flex-col gap-y-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={register("email", { required: "This field cannot be empty" })}
          error={errors.email?.message} 
        />
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          register={register("firstName", { required: "This field cannot be empty" })}
          error={errors.firstName?.message} 
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
          register={register("lastName", { required: "This field cannot be empty" })}
          error={errors.lastName?.message} 
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          register={register("password", { required: "This field cannot be empty" })}
          error={errors.password?.message} 
        />
      </div>
      <div className='mb-5 flex gap-1'>
        <span>You already have account?</span>
        <Link to={PATHS.LOGIN} className='text-blue-600'>Sign-in</Link>
      </div>
        <PrimaryButton type='submit' text="Sign-up" className="bg-blue-600 w-full"/>
    </form>
  )
}

export default FormRegistration
