import "./Login.css";
import image1 from "../../assets/images/image1.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../validation";
import { useAuth } from "../../utilities/auth/AuthContext";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  /**If user already logged; then navigate to play page/** */
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/play");
    }
  }, [isAuthenticated, navigate]);

  /**
   * This function use to handle email and password change
   * @param {onChange event} e
   */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  /**
   * This function use to handle login form submission
   * @param {onSubmit event} e
   */
  const handleLoginFormSubmission = (e) => {
    // Prevent default events execution
    e.preventDefault();
    const validationErrors = validation(values, false);
    // Check for errors
    if (Object.keys(validationErrors).length === 0) {
      login(values.email, values.password);
      // Clear input fields
      setValues({ email: "", password: "" });
    } else {
      // Show validation errors as alerts
      Object.values(validationErrors).forEach((error) => {
        alert(error);
      });
    }
  };

  return (
    <>
      {/**Render login form only if user is not authenticated */}
      {!isAuthenticated && (
        <div className="login">
          <div className="login-container">
            <div className="row gx-0 align-items-center vh-100 border rounded-2">
              <div className="col-md-6">
                <img src={image1} className="img-fluid" alt="login" />
              </div>
              <div className="col-md-6 login-form">
                <form onSubmit={handleLoginFormSubmission}>
                  <div className="form-title py-2 mb-3">
                    <span>PDF HUB</span>
                    <h1>Welcome Back</h1>
                    <h2>Log in to the PDF Hub</h2>
                  </div>
                  <div className="form-container mb-2">
                    <input
                      type="email"
                      className="form-control"
                      id="InputEmail"
                      placeholder="Email"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-container mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="InputPassword"
                      placeholder="Password"
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-text">
                    <p>Forget your password?</p>
                  </div>
                  <div className=" login-button text-center">
                    <Link to={"/home"}>
                      <button type="button" className="lBtn">
                        Login
                      </button>
                    </Link>
                  </div>
                  <div className="login-text">
                    <p>
                      Don't have an account? <span>Sign Up</span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
