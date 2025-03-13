import {IoMdCloseCircle} from "react-icons/io";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {Label} from "./ui/label";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordModal = ({isOpen, onClose}: ResetPasswordModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 z-20'>
      <div className='bg-white w-96 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>Reset Password</h2>
          <button onClick={onClose}>
            <IoMdCloseCircle className='w-7 h-7 text-foreground' />
          </button>
        </div>

        <form action='' method='post'>
          <div className='grid gap-y-4'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' name='email' placeholder='Masukkan email' />
          </div>
        </form>
        <Button className='my-6 w-full px-4 py-2'>Reset</Button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
