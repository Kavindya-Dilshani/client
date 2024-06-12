import "./SignUp.css";
import { useAuth } from "../../utilities/auth/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../validation";

const SignUp = () => {
  const { isAuthenticated, signup } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // If user already logged; then navigate to play page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  /**
   * This function use to handle changes of sign up form input fields
   * @param {onChange event} e
   */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  /**
   * This function use to handle sign-up form submission
   * @param {onSubmit event} e
   */
  const handleSubmit = (e) => {
    // Prevent default events execution
    e.preventDefault();

    const validationErrors = validation(values, true);
    setFormErrors(() => validationErrors);

    // Check for errors
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with sign-up
      signup(
        values.name,
        values.email,
        values.password,
        values.confirmPassword
      );
      // Clear input fields
      setValues({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <>
      {/**Render sign-up form only if user is not authenticated */}
      {!isAuthenticated && (
        <div className="signUp-container container">
          <div className="row my-5">
            <div className="signUp-form col-md-8 mx-auto text-center py-5 border rounded-2 shadow">
              <form className="my-5" onSubmit={handleSubmit}>
                <div className="form-title py-2 mb-3">
                  <span>PDF HUB</span>
                  <h1>Welcome</h1>
                </div>
                <div className="form-container mb-2 col-10 com-md-8 mx-auto">
                  <input
                    type="text"
                    className="form-control p-3 py-2 rounded-5"
                    id="InputName"
                    placeholder="Enter your name"
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                  />
                  {formErrors?.name && (
                    <p className="mt-2 text-start ms-3 text-danger">
                      {formErrors?.name}
                    </p>
                  )}
                </div>
                <div className="form-container mb-2 col-10 com-md-8 mx-auto">
                  <input
                    type="email"
                    className="form-control p-3 py-2 rounded-5"
                    id="InputEmail"
                    placeholder="Enter email"
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
                <div className="form-container mb-2 col-10 com-md-8 mx-auto">
                  <input
                    type="password"
                    className="form-control p-3 py-2 rounded-5"
                    id="confirmRegistrationPassword"
                    placeholder="Enter confirm password"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                  {formErrors?.confirmPassword && (
                    <p className="mt-2 text-start ms-3 text-danger">
                      {formErrors?.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="signUp-button text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-secondary col-6 rounded-5 py-3 mt-3"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="signUp-text mt-4">
                  <p>
                    Already have an account?
                    <Link className="text-decoration-none fw-bold ms-2" to="/">
                      Login
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

export default SignUp;
