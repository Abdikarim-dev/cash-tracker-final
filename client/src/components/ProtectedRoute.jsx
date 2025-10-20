import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// [admin]
// [admin,staff]
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, activeUser: user } = useSelector((s) => s.auth);

  if (!isAuthenticated) return <Navigate to={"/"} />; // first checkpoint

  if (allowedRoles && !allowedRoles?.includes(user?.role))
    // second checkpoint
    return <Navigate to={"/dashboard"} />;

  return <Outlet />; // Last todo
};

// []
// [admin]
// [admin,staff]

// if ( true && (not) * (["admin"].includes(admin))){
//     these statements will be executed if the above conditions are met.
// }
// if ( true && (not) * (true)){
//     these statements will be executed if the above conditions are met.
// }
// if ( true && false){
//     these statements will be executed if the above conditions are met.
// }
// if (false){
//     these statements will be executed if the above conditions are met.
// }

export default ProtectedRoute;
