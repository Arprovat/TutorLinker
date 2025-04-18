
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

const MainNavbar = () => {
  return (
    <nav className="bg-gray-100 py-1 mb-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 ">
        <Link to="/" className="flex items-center">
          <img src='' alt="Logo" className="h-8 w-auto mr-2" />
          <span className="font-bold text-xl">Your Brand</span>
        </Link>

       
        <div className=" md: hidden md:flex items-center bg-white rounded-full shadow-sm border border-gray-300 focus-within:border-indigo-500">
          <BiSearch className="h-5 w-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search..."
            className="py-2 text-black pl-2 pr-4 w-64 rounded-full focus:outline-none border-none  text-sm"
          />
        </div>

       
        <div className="flex items-center space-x-4">
         
          <div className="md:hidden">
           <Link to='/search'> <BiSearch className="h-6 w-6 text-gray-600 cursor-pointer" /></Link>
          </div>
          <Link to="/profile" className="rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <FaUserCircle className="h-8 w-8 text-gray-500" />
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;