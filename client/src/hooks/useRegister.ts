import { useState } from "react";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormData } from "../TypeDefination/TypeDefination";




export const useRegister = () => {
    const [loading, setLoading] = useState(false);

    const { registerUser, updateUserProfile, sendVerificationEmail } = useAuth();
  
    const location = useLocation();
    const navigate = useNavigate();
  
    const [showPass, setShowPass] = useState<boolean>(false);
    const { register, handleSubmit,formState: { errors } } = useForm<FormData>();
  
    const from = location.state?.from?.pathname || "/";
  
    const onSubmit = async (data: FormData) => {
      setLoading(true);
      const name = data?.name;
      const photo = data?.photo;
      const email = data?.email;
      const password = data?.password;
  
      const res = await registerUser(email, password);
      if (res) {
        await updateUserProfile(name, photo);
        await sendVerificationEmail();
        setLoading(false);
        navigate(from, { replace: true });
      } else {
        setLoading(false);
      }
    };
  

return { loading, showPass, register, handleSubmit, onSubmit, setShowPass,errors };

}
