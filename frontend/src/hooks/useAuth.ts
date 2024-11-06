import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegistrationMutation } from "../app/services/authApi";
import { useLazyCurrentQuery } from "../app/services/usersApi";
import { UserLogin } from "../features/FormLogin";
import { UserRegistration } from "../features/FormRegistration";
import { PATHS } from "../constantes/paths";

export const useAuth = (type: string) => {
  const navigate = useNavigate();
  const [triggerCurrentQuery] = useLazyCurrentQuery();
  const [login] = useLoginMutation();
  const [registration] = useRegistrationMutation();

  const fetchAuth = async (data: UserLogin | UserRegistration) => {
    try {
      if (type === 'login') {
        await login(data as UserLogin).unwrap(); 
      } else {
        await registration(data as UserRegistration).unwrap(); 
      }
      const user = await triggerCurrentQuery().unwrap();
      navigate(PATHS.PROFILE(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchAuth };
};