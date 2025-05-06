
import { useState} from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Link } from "react-router-dom" 
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"
const Navbar = ({theme, setTheme}) => {
  
  const {pathname} = useLocation()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  

  return (
    <nav className={`relative z-50 ${theme === "dark" ?   "bg-gray-900": "bg-gray-50"} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary dark:text-primary-dark">EduConnect</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-md font-medium hover:text-primary ${theme === "dark" ?    "text-white " : "text-gray-600"}`}  
              >
                Home
              </Link>
              <Link
                to="feature"
                className={`px-3 py-2 rounded-md text-md font-medium hover:text-primary ${theme === "dark" ? "text-white " : "text-gray-600"}`}  
              >
                Features
              </Link>
              <Link
                to="about"
                className={`px-3 py-2 rounded-md text-md font-medium hover:text-primary ${theme === "dark" ? "text-white " : "text-gray-600"}`}  
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {
                pathname === "/signup" ? (
                  <Link to="/login" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Login
                  </Link>
                ) : (
                  <Link to="/signup" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Sign_Up
                  </Link>
                )
              }
            </div>
          </div>
          <div className="-mr-2  md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="#features"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </Link>
            <Link
              to="#about"
              className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
                {
                  pathname === "/signup" ? (
                    <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Login
                    </Link>
                  ) : (
                    <Link to="/signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Sign_Up
                    </Link>
                  )
                }
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};
export default Navbar

