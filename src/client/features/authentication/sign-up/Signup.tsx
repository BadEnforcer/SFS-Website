// TODO: implement password matcher and password strength check

import React from "react";

import {emailSignupHandler} from "./emailSignupHandler";
import {useNavigate} from "react-router-dom";
import {Slide, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {googleSignupHandler} from "./googleSignupHandler";


const signupPage:React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const navigate = useNavigate()

    return (<>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            limit={2}
            transition={Slide}
        />
        <h1>Sign Up</h1>
    <form>
        <label>Email</label>
        <input type={"email"} onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type={"password"} onChange={(e) => setPassword(e.target.value)} />
        <label>Confirm Password</label>
        <input type={"password"} />
        <button
        onClick={async (e) => {
            e.preventDefault();
            await emailSignupHandler(email, password, navigate)
        }}
        >Sign Up</button>
    </form>
        <button
        onClick={async () => {await googleSignupHandler(navigate)}}
        >Sign up with Google</button>
    </>)
}

export default signupPage;