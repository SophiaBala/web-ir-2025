import React from 'react';
import "./login.css";
import { useFormik } from 'formik';
import { basicSchema } from './schemas';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: basicSchema,
        onSubmit: (values) => {

            const newUser = {
                name: values.name,
                surname: values.surname,
                email: values.email,
                phone: values.phone,
                password: values.password
            };

            //ЗАЛОГОВАНІ
            const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            const isTaken = existingUsers.some(user => user.email === values.email);
            if (isTaken) {
                alert("User with this email already exists");
                return;
            }

            existingUsers.push(newUser);
            localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

            ///НОВИЙ
            localStorage.setItem("user", JSON.stringify({ email: values.email, name: values.name, surname: values.surname, phone: values.phone }));
            
            const cartFromStorage =
                JSON.parse(localStorage.getItem(`cart_${values.email}`)) ||
                { items: [], totalQuantity: 0, totalPrice: 0 };

            dispatch(setCart(cartFromStorage));

            navigate("/home");
        }
    });

    return (
        <div className="container-login">
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={values.name} onChange={handleChange} id='name' type='text' placeholder='Enter your name' onBlur={handleBlur} />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}

                <label>Surname</label>
                <input value={values.surname} onChange={handleChange} id='surname' type='text' placeholder='Enter your surname' onBlur={handleBlur} />
                {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}

                <label>Email</label>
                <input value={values.email} onChange={handleChange} id='email' type='email' placeholder='Enter your email' onBlur={handleBlur} />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}

                <label>Phone number</label>
                <input value={values.phone} onChange={handleChange} id='phone' type='text' placeholder='Enter your phone number' onBlur={handleBlur} />
                {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}

                <label>Password</label>
                <input value={values.password} onChange={handleChange} id='password' type='password' placeholder='Enter your password' onBlur={handleBlur} />
                {errors.password && touched.password && <p className="error">{errors.password}</p>}

                <label>Confirm Password</label>
                <input value={values.confirmPassword} onChange={handleChange} id='confirmPassword' type='password' placeholder='Confirm your password' onBlur={handleBlur} />
                {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="submit">Submit</button>
                <p>Already have an account?</p>
                <Link to="/signin">Sign in</Link>
            </form>
        </div>
    );
}

export default Login;
