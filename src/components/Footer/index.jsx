import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <div className="flex justify-center items-center space-x-4 py-4">
    <a href="https://github.com/Eda-Inal" target="_blank" rel="noopener noreferrer" className="text-3xl">
      <FaGithub />
    </a>
    <a href="https://www.linkedin.com/in/eda-i%C5%9F%C4%B1l-inal-887a69267" target="_blank" rel="noopener noreferrer" className="text-3xl">
      <FaLinkedin />
    </a>
  </div>
  )
}

export default Footer
