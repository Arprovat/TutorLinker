import { Link, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/EduConnect-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../Redux/AuthSlice';
import { useState, useEffect} from 'react';
import { SearchUser } from '../../Redux/Profileslice';

const MainNavbar = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const {profile_pic} = useSelector(state=>state.profile.currentUser)
  const [searchQuery, setSearchQuery] = useState('');
  const {searchUser} = useSelector(state=>state.profile)
  const navigate  = useNavigate()
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
      dispatch(SearchUser(searchQuery));
      } 
    }, 3000);

    return () => clearTimeout(debounceTimer);
  }, [dispatch, searchQuery]);


  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    dispatch(Logout());
    navigate('/')
  };

  const SearchDropdown = () => (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg mt-2 rounded-lg z-50 max-h-60 overflow-y-auto">
        
      
      { searchUser.map((user) => (
        <Link
          key={user.id}
          to={`profile/${user._id}`}
          className="flex items-center p-2 hover:bg-gray-100"
          onClick={() => setSearchQuery('')}
        >
          {user.photoUrl ? (
            <img src={user.photoUrl} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-500 mr-2" />
          )}
          <span className="text-gray-700">{user.username}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="bg-white py-2 mb-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-2">
        <Link to="/main" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
          <span className="font-bold text-xl text-primary">EduConnect</span>
        </Link>

        <div className="hidden md:flex items-center relative" >
          <div className="bg-white rounded-full shadow-sm border border-gray-300 focus-within:border-indigo-500 relative">
            <BiSearch className="h-5 w-5 text-gray-400 ml-3 absolute top-3 left-0" />
            <input
              type="text"
              placeholder="Search users..."
              className="py-2 pl-8 pr-4 w-64 text-black rounded-full focus:outline-none border-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && <SearchDropdown />}
          </div>
        </div>

       
        

        <div className="flex gap-3 items-center">
          <Link to={`profile/${userId}`}>
            {profile_pic?
           <img src={profile_pic} alt="" className='h-8 w-8 rounded-full object-cover'/>
            :<FaUserCircle className="h-8 w-8 text-gray-500" />}
          </Link>
          <button onClick={handleLogout} className="btn btn-warning">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;