import "./SignUp.css";
import image1 from "../../assets/images/image1.jpg";
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

  const handleSubmit = (e) => {
    // Prevent default events execution
    e.preventDefault();
    const validationErrors = validation(values, true);
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
    } else {
      // Show validation errors as alerts
      Object.values(validationErrors).forEach((error) => {
        alert(error);
      });
    }
  };

  return (
    <>
     {!isAuthenticated && (
    <div className="signUp">
      <div className="signUp-container">
        <div className="row gx-0 align-items-center vh-100 border rounded-2">
          <div className="col-md-6">
            <img src={image1} className="img-fluid" alt="signUp" />
          </div>
          <div className="col-md-6 signUp-form">
            <form onSubmit={handleSubmit}>
              <div className="form-title py-2 mb-3">
                <span>PDF HUB</span>
                <h1>Welcome</h1>
                <h2>Sign Up to the PDF Hub</h2>
              </div>
              <div className="form-container mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="InputName"
                  placeholder="Name"
                  value={values.name}
                    name="name"
                    onChange={handleChange}
                />
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
              <div className="form-container mb-2">
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
              <div className="form-container mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmRegistrationPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                />
              </div>
              <div className=" signUp-button text-center">
                <button type="button" className="sBtn">
                Sign Up
                </button>
              </div>
              <div className="signUp-text">
                 <p>Already have an account? <span>Login</span></p> 
                </div>
            </form>
            </div>
        </div>
      </div>
    </div>
    )}
  </>
  )
}

export default SignUp
