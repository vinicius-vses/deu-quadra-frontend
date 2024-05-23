import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { AuthenticationContext } from '../../contexts/Auth';
import { NavbarLoginButton } from './NavbarLoginButton';
import LanguageSelector from './LanguageSelector';
import TopMenu from './TopMenu'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const auth = useContext(AuthenticationContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={'h-[80px] bg-slate-100 ' + className}>
      <nav
        className={`fixed top-0 left-0 w-full bg-green-500 p-4 h-[80px] transition-transform ${
          isScrolled ? '-translate-y-full' : ''
        }`}
      >
        <div className="container max-w-screen-lg mx-auto px-10 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center"> 
            <Logo lightMode={true} className="mr-auto" /> 
            <TopMenu /> 
          </Link>
          <div className="hidden md:flex items-center">
            <div className="ml-auto"> 
              <NavbarLoginButton />
              {!auth.isAuthenticated && (
                <Link to="/presignup" className="text-white ml-4">Cadastre-se</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
     
      <BottomMenu />
    </div>
  );
}

function BottomMenu() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-green-500 p-2 h-[40px]">
      <div className="container max-w-screen-lg mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center relative">
          <span className="text-white font-bold mr-2 cursor-pointer" onClick={toggleDropdown}>
            Menu <FontAwesomeIcon icon={faAngleUp} className={`ml-1 ${showDropdown ? 'rotate-180' : ''}`} />
          </span>
          {showDropdown && (
            <div className="dropdown-menu absolute bg-white shadow-md border border-gray-200 bottom-full left-0 w-48"> 
              <Link to="/" className="text-black hover:text-gray-800 block py-1 px-4">Home</Link>
              <Link to="/locadorPage" className="text-black hover:text-gray-800 block py-1 px-4">Área do Locador</Link>
              <Link to="/locatarioPage" className="text-black hover:text-gray-800 block py-1 px-4">Área do Locatário</Link>
              <Link to="/search" className="text-black hover:text-gray-800 block py-1 px-4">Search</Link>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex"> 
            <a href="https://www.youtube.com/@deuQuadra" target="_blank" rel="noopener noreferrer" className="text-white mr-4">
              YouTube
            </a>
            <a href="https://github.com/deuquadra" target="_blank" rel="noopener noreferrer" className="text-white mr-4">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
