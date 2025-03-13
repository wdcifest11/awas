import LoginModal from "./login-modal";
import SignUpModal from "./signup-modal";
import ResetPasswordModal from "./reset-password-moda";
import {useAuth} from "@/context/auth";

interface AuthModalsProps {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  isResetPasswordModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  setIsSignUpModalOpen: (open: boolean) => void;
  setIsResetPasswordModalOpen: (open: boolean) => void;
}

const AuthModals = ({
  isLoginModalOpen,
  isSignUpModalOpen,
  isResetPasswordModalOpen,
  setIsLoginModalOpen,
  setIsSignUpModalOpen,
  setIsResetPasswordModalOpen,
}: AuthModalsProps) => {
  const isLoggedIn = false;

  return (
    <>
      {isLoginModalOpen && !isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSignUpClick={() => {
            setIsLoginModalOpen(false);
            setIsSignUpModalOpen(true);
          }}
          onResetPasswordClick={() => {
            setIsLoginModalOpen(false);
            setIsResetPasswordModalOpen(true);
          }}
        />
      )}
      {isSignUpModalOpen && !isLoggedIn && (
        <SignUpModal
          isOpen={isSignUpModalOpen}
          onClose={() => setIsSignUpModalOpen(false)}
          onLoginClick={() => {
            setIsSignUpModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}
      {isResetPasswordModalOpen && !isLoggedIn && (
        <ResetPasswordModal
          isOpen={isResetPasswordModalOpen}
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default AuthModals;
