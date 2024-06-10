import "./SignUp.css";
import image1 from "../../assets/images/image1.jpg";

const SignUp = () => {
  return (
    <>
    <div className="signUp">
      <div className="signUp-container">
        <div className="row gx-0 align-items-center vh-100 border rounded-2">
          <div className="col-md-6">
            <img src={image1} className="img-fluid" alt="signUp" />
          </div>
          <div className="col-md-6 signUp-form">
            <form>
              <div className="form-title py-2 mb-3">
                <span>PDF HUB</span>
                <h1>Welcome</h1>
                <h2>Sign Up to the PDF Hub</h2>
              </div>
              <div className="form-container mb-2">
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                />
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
              <div className="form-container mb-3">
                <input
                  type="ConfirmPassword"
                  className="form-control"
                  id="password"
                  placeholder="Confirm Password"
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
  </>
  )
}

export default SignUp
