import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./core/login/Login";
import SignUp from "./core/signUp/SignUp";
import Home from "./pages/home/Home";
import { AuthProvider } from "./utilities/auth/AuthProvider";
import { PrivateRoutes } from "./utilities/auth/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />

          {/* private routes
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
