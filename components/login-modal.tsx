"use client";

import {IoMdCloseCircle} from "react-icons/io";
import {IoEyeOff, IoEye} from "react-icons/io5";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {FcGoogle} from "react-icons/fc";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserLoginForm, userLoginSchema} from "@/schemas/user-schema";
import ErrorMessages from "./error-message";
import {login} from "@/app/actions/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
  onResetPasswordClick: () => void;
}

const LoginModal = ({
  isOpen,
  onClose,
  onSignUpClick,
  onResetPasswordClick,
}: LoginModalProps) => {
  if (!isOpen) return null;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UserLoginForm>({
    resolver: zodResolver(userLoginSchema),
  });

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server");
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 z-20'>
      <div className='bg-white w-96 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>Masuk</h2>
          <button onClick={onClose}>
            <IoMdCloseCircle className='w-7 h-7 text-foreground' />
          </button>
        </div>

        <Button asChild variant='outline' className='w-full'>
          <div className='flex gap-2'>
            <FcGoogle className='w-7 h-7' />
            <p className='text-sm'>Masuk dengan Google</p>
          </div>
        </Button>

        <div className='flex items-center justify-center my-6'>
          <hr className='w-1/3' />
          <p className='mx-2 text-sm'>Atau</p>
          <hr className='w-1/3' />
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className='mb-2'>
            <Input
              type='email'
              {...register("email")}
              placeholder='Masukkan email'
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <ErrorMessages errors={errors.email.message} />}
          </div>

          <div className='mt-2 relative'>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder='Masukkan password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOff className='w-5 h-5' />
              ) : (
                <IoEye className='w-5 h-5' />
              )}
            </button>
            {errors.password && (
              <ErrorMessages errors={errors.password.message} />
            )}
          </div>

          <Button type='submit' className='mt-6 mb-2 w-full px-4 py-2'>
            Login
          </Button>
        </form>
        {error && <p className='text-red-600 text-sm text-center'>{error}</p>}
        <div className='flex justify-between'>
          <Button variant='link' onClick={onSignUpClick} className='text-sm'>
            Belum punya akun?
          </Button>
          <Button
            variant='link'
            className='text-sm'
            onClick={onResetPasswordClick}
          >
            Lupa password?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
