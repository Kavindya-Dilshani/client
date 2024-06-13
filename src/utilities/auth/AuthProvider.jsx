import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndpoints } from "../../endpoints/endpoints";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = (props) => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check login status for initial render
  useEffect(() => {
    // Function to validate the token
    const validateToken = () => {
      // Get auth token from local storage
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // Decode the auth token
          const decodedToken = jwtDecode(token);
          // Check expiration of the token
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            // Set isAuthenticated to true
            setIsAuthenticated(() => true);
          } else {
            // Set isAuthenticated to false
            setIsAuthenticated(() => false);
            // Remove expired token
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          // Set isAuthenticated to false
          setIsAuthenticated(() => false);
          // Remove invalid token
          localStorage.removeItem("authToken");
        }
      } else {
        // Set isAuthenticated to false
        setIsAuthenticated(() => false);
      }
    };
    // Trigger the validateToken function
    validateToken();
  }, [isAuthenticated, navigate]);

  /**
   * This function use for user login
   * @param {user email} email
   * @param {user password} password
   */
  const login = async (email, password) => {
    const request = { email, password };
    try {
      // Make an HTTP POST request to your server's login endpoint
      const response = await axios.post(apiEndpoints.login, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.status === "success") {
        // Get token and user values from response
        const { token, user } = response?.data;
        localStorage.setItem("authToken", token);
        // Store user object as JSON string
        localStorage.setItem("user", JSON.stringify(user));
        // Set isAuthenticated to true
        setIsAuthenticated(() => true);
        // Navigate to the desired page
        navigate("/home");
      } else {
        // Set isAuthenticated to false
        setIsAuthenticated(() => false);
        // Handle unsuccessful login
        console.error("Login failed:", response?.data?.message);
      }
    } catch (error) {
      // Set isAuthenticated to false
      setIsAuthenticated(() => false);
      // Handle network errors or other exceptions
      console.error("An error occurred during login:", error.message);
    }
  };

  /**
   * This function use for sign up user
   * @param {user name} name
   * @param {user email} email
   * @param {password} password
   * @param {confirmation password} confirmPassword
   */
  const signup = async (name, email, password, confirmPassword) => {
    const request = { name, email, password, confirmPassword };
    try {
      // Make an HTTP POST request to your server's sign-up endpoint
      const response = await axios.post(apiEndpoints.signup, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful
      if (response?.data?.status === "success") {
        // Get token and user values from response
        const { token, user } = response?.data;
        localStorage.setItem("authToken", token);
        // Store user object as JSON string
        localStorage.setItem("user", JSON.stringify(user));
        // Set isAuthenticated to true
        setIsAuthenticated(() => true);
        // Navigate to the desired page
        navigate("/home");
      } else {
        // Set isAuthenticated to false
        setIsAuthenticated(() => false);
        // Handle unsuccessful sign-up
        console.error("Sign up failed:", response?.data?.message);
      }
    } catch (error) {
      // Set isAuthenticated to false
      setIsAuthenticated(() => false);
      // Handle network errors or other exceptions
      console.error("An error occurred during login:", error.message);
    }
  };

  /**
   * This function use for user logout
   */
  const logout = () => {
    // Remove user details
    localStorage.removeItem("user");
    // Remove auth token
    localStorage.removeItem("authToken");
    // Set isAuthenticated to false
    setIsAuthenticated(() => false);
    // Navigate to login page
    navigate("/");
  };

  /**
   * This function use to get logged user details
   */
  const getUser = () => {
    const userFromLocalStorage = localStorage.getItem("user");
    const userObj = userFromLocalStorage
      ? JSON.parse(userFromLocalStorage)
      : null;
    return userObj;
  };

  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, signup, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
