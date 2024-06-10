import "./Login.css";
import image1 from "../../assets/images/image1.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="login">
        <div className="login-container">
          <div className="row gx-0 align-items-center vh-100 border rounded-2">
            <div className="col-md-6">
              <img src={image1} className="img-fluid" alt="login" />
            </div>
            <div className="col-md-6 login-form">
              <form>
                <div className="form-title py-2 mb-3">
                  <span>PDF HUB</span>
                  <h1>Welcome Back</h1>
                  <h2>Log in to the PDF Hub</h2>
                </div>
                <div className="form-container mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-container mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-text">
                  <p>Forget your password?</p>
                </div>
                <div className=" login-button text-center">
                  <Link to={'/signUp'}><button type="button" className="lBtn">
                    Login
                  </button></Link>
                </div>
                <div className="login-text">
                   <p>Don't have an account? <span>Sign Up</span></p> 
                  </div>
              </form>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
