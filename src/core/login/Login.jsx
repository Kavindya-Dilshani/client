import "./Login.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../validation";
import { useAuth } from "../../utilities/auth/AuthContext";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const { isAuthenticated, login } = useAuth();
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // If user already logged; then redirect user the to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  /**
   * This function use to handle email and password change
   * @param {onChange event} e
   */
  const handleChange = (e) => {
    setValues({ ...values, [e?.target?.name]: e?.target?.value });
  };

  /**
   * This function use to handle login form submission
   * @param {onSubmit event} e
   */
  const handleLoginFormSubmission = (e) => {
    // Prevent default events execution
    e.preventDefault();
    
    const validationErrors = validation(values, false);
    setFormErrors(() => validationErrors);

    // Check for errors
    if (Object.keys(validationErrors).length === 0) {
      login(values?.email, values?.password);
      // Clear input fields
      setValues({ email: "", password: "" });
    }
  };

  return (
    <>
      {/**Render login form only if user is not authenticated */}
      {!isAuthenticated && (
        <div className="login-container container">
          <div className="row my-5">
            <div className="login-form col-md-8 mx-auto text-center py-5 border rounded-2 shadow">
              <form className="my-5" onSubmit={handleLoginFormSubmission}>
                <div className="form-title py-2 mb-3">
                  <span>PDF HUB</span>
                  <h1>Welcome Back</h1>
                </div>
                <div className="form-container mb-2 col-10 com-md-8 mx-auto">
                  <input
                    type="email"
                    className="form-control p-3 py-2 rounded-5"
                    id="InputEmail"
                    placeholder="Enter email address"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                  />
                  {formErrors?.email && (
                    <p className="mt-2 text-start ms-3 text-danger">
                      {formErrors?.email}
                    </p>
                  )}
                </div>
                <div className="form-container mb-2 col-10 com-md-8 mx-auto">
                  <input
                    type="password"
                    className="form-control p-3 py-2 rounded-5"
                    id="InputPassword"
                    placeholder="Enter password"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                  />
                  {formErrors?.password && (
                    <p className="mt-2 text-start ms-3 text-danger">
                      {formErrors?.password}
                    </p>
                  )}
                </div>
                <div className="form-text mt-4">
                  <p className="fw-bold">Forget your password?</p>
                </div>
                <div className="login-button text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-secondary col-6 rounded-5 py-3"
                  >
                    Login
                  </button>
                </div>
                <div className="login-text mt-4">
                  <p>
                    Don't have an account?
                    <Link className="text-decoration-none fw-bold ms-2" to="/signUp">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
