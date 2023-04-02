import { Navigate } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  if (!localStorage.getItem("userToekn")) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
};

export default Protected;
