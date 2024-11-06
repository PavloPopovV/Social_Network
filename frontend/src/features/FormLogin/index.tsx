import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { User } from '../../app/types';
import { PATHS } from '../../constantes/paths';
import { useAuth } from '../../hooks/useAuth';
import PrimaryButton from '../../ui/PrimaryButton';
import Input from '../../ui/Input';

export type UserLogin = Pick<User, "email" | "password" >;

const FormLogin = () => {
  const { fetchAuth } = useAuth('login');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email:"",
      password:"",
    },
  });

  const onSubmit = (data:UserLogin)=>{
    console.log(data)
    fetchAuth(data)
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center w-[450px] bg-gray-800 py-10 px-10 rounded-xl' >
      <h1 className='text-[30px] mb-4'>Login</h1>
      <div className="w-full mb-2 flex flex-col gap-y-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={register("email", { required: "This field cannot be empty" })}
          error={errors.email?.message} 
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
        <span>No account?</span>
        <Link to={PATHS.REGISTER} className='text-blue-600'>Sign-up</Link>
      </div>
        <PrimaryButton type='submit' text="Sign-up" className='bg-blue-600 w-full'/>
    </form>
  )
}

export default FormLogin
