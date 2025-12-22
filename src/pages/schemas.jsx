import * as yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

const hasUppercase = /[A-Z]/;
const hasNumber = /\d/;
const hasSpecial = /[!@#$%^&*]/;

export const basicSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required")
        .test(
        "domain-length",
        "Domain must be at least 2 characters",
        (value) => {
            if (!value) return false;
            const domain = value.split(".")[1];
            if (!domain) return false;
            const domainParts = domain.split(".");
            return domainParts[0].length >= 2;
        }
    ),
    phone: yup
        .string()
        .matches(/^[0-9]{10,15}$/, "Phone number is invalid")
        .required("Phone number is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(hasUppercase, "Password must contain an uppercase letter")
        .matches(hasNumber, "Password must contain numbers")
        .matches(hasSpecial, "Please include special characters")
        .required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

