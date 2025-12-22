import SucceedIMG from "./succeed-img.jpg"
import React from 'react';

import { useFormik } from 'formik';
import { basicSchema } from './schemas';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";


const Succeed = () => {
    return (
        <div className="container">
            <div className='hero'>
                <div className="hero-text-container"></div>
                <img src={SucceedIMG} className = "camera-hero"></img >
            </div>
        </div>

    )
}
export default Succeed;
