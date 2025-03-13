"use client";

import {useState, useEffect, useRef} from "react";
import Link from "next/link";
import {MdOutlineShoppingCart} from "react-icons/md";
import {RiMenu2Fill} from "react-icons/ri";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosSearch,
  IoMdClose,
} from "react-icons/io";
import {CgProfile} from "react-icons/cg";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import Particles from "./particles";
import AuthModals from "./auth-modals";
import {useProductInCart} from "@/lib/local-storage";
import {useAuth} from "@/context/auth";
import {LuMessageCircleMore} from "react-icons/lu";
import {motion, AnimatePresence} from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {getUser, logout} from "@/app/actions/auth";
import {UserType} from "@/types/user";
import {useRouter} from "next/navigation";

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        onClick={toggle}
        className='flex items-center gap-2 font-semibold'
      >
        Jasa {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isOpen && (
        <ul className='absolute bg-gray-50 p-2 px-4 w-[12rem] h-[6rem] rounded-lg top-full mt-1 shadow-lg'>
          {[
            {href: "/donation", label: "Donasi Pakaian"},
            {href: "/repair", label: "Perbaiki Pakaian"},
          ].map(({href, label}) => (
            <li key={href}>
              <Link href={href} className='font-semibold block py-1'>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UserIcons = ({
  totalProductInCart,
  user,
}: {
  totalProductInCart: number;
  user: UserType | null | undefined;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Menutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='flex space-x-3 items-center relative'>
      {[
        {Icon: MdOutlineShoppingCart, href: "/cart"},
        {Icon: LuMessageCircleMore, href: "/messages"},
      ].map(({Icon, href}, index) => (
        <Link
          key={index}
          href={href}
          className='bg-white p-2 rounded-full relative'
        >
          {href === "/cart" && totalProductInCart > 0 && (
            <span className='absolute -top-1 -left-2 bg-red-500 text-white p-1 px-2 text-[.6rem] rounded-full'>
              {totalProductInCart}
            </span>
          )}
          <Icon className='w-5 h-5' />
        </Link>
      ))}

      {/* Profile Dropdown */}
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className='bg-white p-2 rounded-full'
        >
          <CgProfile size={20} />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{y: -100, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              exit={{y: -100, opacity: 0}}
              transition={{duration: 0.2, ease: "easeOut"}}
              className='absolute left-0 lg:-left-20 mt-2 w-48 bg-white border shadow-lg rounded-md'
            >
              <div className='p-2 text-gray-700 font-semibold'>My Account</div>
              <hr />
              <ul className='py-2'>
                <li>
                  <Link
                    href='/user/thrift-store'
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href='/dashboard'
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      await logout();
                      setDropdownOpen(false);
                    }}
                    className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<
    UserType | null | undefined
  >(null);
  const [query, setQuery] = useState("");
  const {isAuthenticated} = useAuth();
  const totalProductInCart = useProductInCart().cart.length;
  const navbarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setAuthenticatedUser(user);
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, []);

  return (
    <div className='relative container mx-auto' ref={navbarRef}>
      <Particles style='w-[300px] h-[200px] absolute left-0 top-0' />
      <Particles style='hidden md:block w-[400px] h-[200px] absolute -right-20 md:right-0 top-0' />
      <header className='fixed left-0 right-0 p-4 md:px-8 lg:px-12 backdrop-blur-xl drop-shadow-sm z-50'>
        <nav className='container mx-auto flex gap-4 justify-between items-center'>
          <div className='flex gap-8 w-full lg:w-1/2'>
            <Link
              href='/'
              className='font-bold text-3xl font-[family-name:var(--font-playfair)]'
            >
              EcoWearHub
            </Link>
            <div className='relative hidden md:flex w-full items-center'>
              <IoIosSearch className='absolute left-3 w-6 h-6 text-gray-300' />
              <Input
                onChange={(e) => setQuery(e.target.value)}
                type='text'
                placeholder='Cari Produk...'
                className='w-full rounded-full pl-10 pr-4 py-2'
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden'
          >
            {isMenuOpen ? (
              <IoMdClose className='w-7 h-7' />
            ) : (
              <RiMenu2Fill className='w-7 h-7' />
            )}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && windowWidth < 1024 && (
              <motion.ul
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{duration: 0.2, ease: "easeOut"}}
                className='absolute left-0 top-0 bottom-0 w-[80%] h-screen bg-white p-6 space-y-8'
                id='navlinks'
              >
                <CategoryDropdown />
                {[
                  {href: "/shop", label: "Belanja"},
                  {href: "/education", label: "Edukasi"},
                ].map((nav) => (
                  <li key={nav.href}>
                    <Link href={nav.href} className='font-semibold'>
                      {nav.label}
                    </Link>
                  </li>
                ))}
                {isAuthenticated ? (
                  <UserIcons
                    totalProductInCart={totalProductInCart}
                    user={authenticatedUser}
                  />
                ) : (
                  <AuthButtons
                    onLoginClick={() => setIsLoginModalOpen(true)}
                    onSignUpClick={() => setIsSignUpModalOpen(true)}
                  />
                )}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Desktop Menu */}
          <ul className='hidden lg:flex space-x-5 xl:space-x-10'>
            {[
              {href: "/shop", label: "Belanja"},
              {href: "/education", label: "Edukasi"},
            ].map((nav) => (
              <li key={nav.href}>
                <Link href={nav.href} className='font-semibold'>
                  {nav.label}
                </Link>
              </li>
            ))}
            <CategoryDropdown />
          </ul>

          {/* User Section */}
          {windowWidth > 968 ? (
            isAuthenticated ? (
              <UserIcons
                totalProductInCart={totalProductInCart}
                user={authenticatedUser}
              />
            ) : (
              <AuthButtons
                onLoginClick={() => setIsLoginModalOpen(true)}
                onSignUpClick={() => setIsSignUpModalOpen(true)}
              />
            )
          ) : null}
          {
            // isProfileDropdownOpen &&
          }
        </nav>
      </header>

      {!isAuthenticated && (
        <AuthModals
          isLoginModalOpen={isLoginModalOpen}
          isSignUpModalOpen={isSignUpModalOpen}
          isResetPasswordModalOpen={isResetPasswordModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
          setIsResetPasswordModalOpen={setIsResetPasswordModalOpen}
        />
      )}
    </div>
  );
};

const AuthButtons = ({
  onLoginClick,
  onSignUpClick,
}: {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}) => (
  <div className='flex space-x-3'>
    <Button variant='outline' onClick={onLoginClick}>
      Masuk
    </Button>
    <Button onClick={onSignUpClick}>Daftar</Button>
  </div>
);

export default Navbar;
