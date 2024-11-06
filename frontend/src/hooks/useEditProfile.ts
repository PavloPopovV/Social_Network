import { useNavigate } from "react-router-dom";
import { ProfileEdit, useEditUserMutation, useLazyCurrentQuery } from "../app/services/usersApi";
import { PATHS } from "../constantes/paths";


export const useEditProfile = () => {
    const navigate = useNavigate();
    const [editUser] = useEditUserMutation()
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const fetchEditUser = async (id: string, data: ProfileEdit) => {
        try {
            await editUser({ userData: data, id }).unwrap()
            const user = await triggerCurrentQuery().unwrap();
            navigate(PATHS.PROFILE(user._id), { replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    return { fetchEditUser }
}       