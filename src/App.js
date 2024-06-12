import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./core/login/Login";
import SignUp from "./core/signUp/SignUp";
import Home from "./pages/home/Home";
import { AuthProvider } from "./utilities/auth/AuthProvider";
import { PrivateRoutes } from "./utilities/auth/PrivateRoutes";
import PdfViewer from "./pages/pdf-viewer/PdfViewer";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* private routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/pdf-viewer/:documentId" element={<PdfViewer />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
