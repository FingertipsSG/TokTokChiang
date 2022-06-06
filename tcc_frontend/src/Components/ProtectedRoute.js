import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = JSON.parse(localStorage.getItem("token"));

  if (isAuth == undefined) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
