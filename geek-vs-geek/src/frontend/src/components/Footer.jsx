import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='footer font-poppins w-full'>
      <hr className='border-slate-200' />
      <div className='footer-container flex flex-col items-center'>
        <p className='text-center mt-4'>
          © {(new Date().getFullYear())} Made with ♥️ by <strong>Dheekshith B G</strong>. All rights reserved.
        </p>
        <div className='flex gap-3 justify-center items-center mt-4'>
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target='_blank'>
              <img
                src={link.iconUrl}
                alt={link.name}
                className='w-6 h-6 object-contain'
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;