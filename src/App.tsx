import { Routes, Route, Navigate } from "react-router-dom";

import Nomatch from "./pages/Nomatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import LeftSidebarLayout from "./layouts/LeftSidebar";
import NoSidebarLayout from "./layouts/NoSidebar";
import Protected from "./components/routes/Protected";

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <Protected>
            <NoSidebarLayout />
          </Protected>
        }
      >
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route index path="users" element={<Users />} />
      </Route>
      <Route element={<LeftSidebarLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<Nomatch />} />
    </Routes>
  );
};

export default App;
