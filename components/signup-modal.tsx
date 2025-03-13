"use client";

import {IoMdCloseCircle} from "react-icons/io";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {FcGoogle} from "react-icons/fc";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserSignUpForm, userSignUpSchema} from "@/schemas/user-schema";
import ErrorMessages from "./error-message";
import {useState} from "react";
import {registerAction} from "@/app/actions/auth";
import {IoEye, IoEyeOff} from "react-icons/io5";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const SignUpModal = ({isOpen, onClose, onLoginClick}: SignUpModalProps) => {
  if (!isOpen) return null;
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UserSignUpForm>({
    resolver: zodResolver(userSignUpSchema),
  });

  const handleRegister = async (data: UserSignUpForm) => {
    const res = await registerAction(data);
    if (res.success) {
      onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 z-20'>
      <div className='bg-white w-96 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>Daftar</h2>
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

        <form onSubmit={handleSubmit(handleRegister)} method='post'>
          <div className='grid gap-y-4'>
            <div>
              <Input
                type='email'
                placeholder='Masukkan email'
                {...register("email")}
              />
              {errors.email && <ErrorMessages errors={errors.email.message} />}
            </div>
            <div>
              <Input
                type='text'
                {...register("name")}
                placeholder='Masukkan name'
              />
              {errors.name && <ErrorMessages errors={errors.name.message} />}
            </div>
            <div className='relative'>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder='Masukkan password'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-3 flex items-center'
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
            <div className='relative'>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder='Masukkan konfirmasi password'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-3 flex items-center'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <IoEyeOff className='w-5 h-5' />
                ) : (
                  <IoEye className='w-5 h-5' />
                )}
              </button>
              {errors.confirmPassword && (
                <ErrorMessages errors={errors.confirmPassword.message} />
              )}
            </div>
          </div>
          <Button type='submit' className='w-full my-6 px-4 py-2'>
            Daftar
          </Button>
        </form>
        {error && <ErrorMessages errors={error} />}
        <div className='flex justify-center'>
          <Button variant='link' onClick={onLoginClick} className='text-sm'>
            Sudah punya akun?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
