import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const Navigate = useNavigate();
    if(localStorage.getItem('refresh_token')){
        return children
    }
    else{
        Navigate('login')}
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;