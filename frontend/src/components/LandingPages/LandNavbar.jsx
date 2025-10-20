import React, { useEffect, useState } from 'react';
import Logo from '../../assets/CPMS.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingNavbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [buttonSize, setButtonSize] = useState('lg');
  const [logoText, setLogoText] = useState('College Placement Management System');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) setButtonSize('sm'), setLogoText('CPMS');
      else if (width <= 768) setButtonSize('md'), setLogoText('College Placement Management System');
      else setButtonSize('lg'), setLogoText('College Placement Management System');
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={`w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md sticky top-0' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src={Logo} alt="CPMS Logo" className="rounded-xl w-16 h-16 md:w-20 md:h-20" />
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{logoText}</h1>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 md:gap-3 items-center">
          <div className="flex gap-2 md:gap-3 items-center">
            <button
              className={`px-4 md:w-32 py-2 border border-gray-800 text-gray-900 font-semibold rounded hover:bg-gray-800 hover:text-white transition`}
              onClick={() => navigate('/student/login')}
            >
              Login
            </button>
            <button
              className={`px-4 md:w-32 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-700 transition`}
              onClick={() => navigate('/student/signup')}
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
