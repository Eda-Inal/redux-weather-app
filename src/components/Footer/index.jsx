import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bottom-0 left-0 w-full py-4 hidden md:block">
      <div className="flex justify-center items-center space-x-4">
        <a href="https://github.com/Eda-Inal" target="_blank" rel="noopener noreferrer" className="text-2xl">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/eda-i%C5%9F%C4%B1l-inal-887a69267" target="_blank" rel="noopener noreferrer" className="text-2xl">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Footer;
