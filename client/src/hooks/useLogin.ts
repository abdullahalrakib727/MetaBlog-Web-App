import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export interface FormData {
  email: string;
  password: string;
}

export default function useLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { signInUser, handleGoogleSignIn } = useAuth();

  const handleGoogleLogin = async () => {
    setLoading(true);

    await handleGoogleSignIn();
    setLoading(false);
    navigate(from, { replace: true });
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const email = data?.email;
    const password = data?.password;

    const result = await signInUser(email, password);
    if (result) {
      setLoading(false);
      return navigate(from, { replace: true });
    }
    setLoading(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    showPass,
    setShowPass,
    handleGoogleLogin,
    onSubmit,
    loading,
  };
}
