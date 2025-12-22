import React from 'react';
import "./login.css";
import { useFormik } from 'formik';
import { basicSchema } from './schemas';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
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
            localStorage.setItem("user", JSON.stringify(values));

            const cartFromStorage =
                JSON.parse(localStorage.getItem(`cart_${values.email}`)) ||
                { items: [], totalQuantity: 0, totalPrice: 0 };

            dispatch(setCart(cartFromStorage));

            navigate("/succeed");
        }
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = formik;

    const handleEnterData = () => {
        const savedUser = JSON.parse(localStorage.getItem("user")) || {};
        if (savedUser.email) {
            setValues({
                name: savedUser.name || '',
                surname: savedUser.surname || '',
                email: savedUser.email || '',
                phone: savedUser.phone || '',
                password: '',
                confirmPassword: ''
            });
        } else {
            alert("No user data found in localStorage");
        }
    };

    return (
        <div className="container-login">
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={values.name} onChange={handleChange} id='name' type='text' onBlur={handleBlur} />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}

                <label>Surname</label>
                <input value={values.surname} onChange={handleChange} id='surname' type='text' onBlur={handleBlur} />
                {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}

                <label>Email</label>
                <input value={values.email} onChange={handleChange} id='email' type='email' onBlur={handleBlur} />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}

                <label>Phone number</label>
                <input value={values.phone} onChange={handleChange} id='phone' type='text' onBlur={handleBlur} />
                {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}

                <button type="button" onClick={handleEnterData}>Enter my data</button>

                <button type="submit">Checkout</button>
            </form>
        </div>
    );
}

export default Checkout;
