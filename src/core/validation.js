
const validation = (values, isSignUp) => {
    let errors = {};

    if (isSignUp) {
        if (!values.name) {
            errors.name = "Name is required";
        } else if (values.name.length < 5) {
            errors.name = "Name must be at least 5 characters long";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email is not valid";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
        }
    } else { // For login
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email is not valid";
        }

        if (!values.password) {
            errors.password = "Password is required";
        }
    }

    return errors;
};

export default validation;

