import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedUser }) => {
  const token = localStorage.getItem('refresh_token');
  const role  = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUser.includes(role)) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  allowedUser: PropTypes.arrayOf(PropTypes.string).isRequired,
  children:    PropTypes.node.isRequired
};

export default PrivateRoute;
