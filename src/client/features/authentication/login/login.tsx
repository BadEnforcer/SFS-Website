import React from "react";
import {useNavigate} from "react-router-dom";


import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import googleSignInHandler from "./googleLoginHandler";
import {handleEmailLogin} from "./emailLoginHandler";

const LoginPage:React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [error_message, setError_message] = React.useState<undefined | string>(undefined);


    const navigate = useNavigate();

    React.useEffect(() => {
        if (error_message) {
            toast.error(error_message, {
                theme: "colored",
            });
        }
    }, [])

    return (
    <div>
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
        <form>
            <label>Email</label>
            <input type={"email"} onChange={(e) => {setEmail(e.target.value)}} />
            <label>Password</label>
            <input type={"password"} onChange={(e) => setPassword(e.target.value) } />
            <button onClick={async (e) => {
                e.preventDefault();
                await handleEmailLogin(email, password, navigate);
            }}>Login</button>
        </form>
        <button
        onClick={async () => await googleSignInHandler(navigate)}
        >Sign in with google</button>
        <button onClick={() => navigate('/signup')}>Signup Instead?</button>
    </div>
    )
}

export default LoginPage;