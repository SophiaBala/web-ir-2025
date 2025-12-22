import React from 'react';
import "./login.css";
import { useFormik } from 'formik';
import { signinSchema } from './signinSchema';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";

function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: signinSchema,
        onSubmit: (values) => {

            const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            const existingUser = users.find(user => user.email === values.email);
            if (!existingUser) {
                alert("User not found. Please register first.");
                return;
            }

            if (existingUser.password !== values.password) {
                alert("Incorrect password!");
                return;
            }

            localStorage.setItem("user", JSON.stringify({ email: values.email }));

            const savedCart =
                JSON.parse(localStorage.getItem(`cart_${values.email}`)) ||
                { items: [], totalQuantity: 0, totalPrice: 0 };

            dispatch(setCart(savedCart));

            navigate("/home");
        }
    });

    return (
        <div className="container-login">
            <form onSubmit={handleSubmit}>     
                
                <label>Email</label>
                <input
                    value={values.email}
                    onChange={handleChange}
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}

                <label>Password</label>
                <input
                    value={values.password}
                    onChange={handleChange}
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    onBlur={handleBlur}
                />
                {errors.password && touched.password && <p className="error">{errors.password}</p>}

                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default Signin;
