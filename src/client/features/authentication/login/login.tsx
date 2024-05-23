import React from "react";
import {useNavigate} from "react-router-dom";


import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import googleSignInHandler from "./googleHandler";
import setDefaultClaimsReq from "./setDefaultClaims";

const server_url = import.meta.env.VITE_API_SERVER_URL;



const LoginPage:React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [error_message, setError_message] = React.useState<undefined | string>(undefined);

    React.useEffect(() => {
        if(error_message) {
            toast.error(error_message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    }, []) // unmount after first render

    const navigate = useNavigate();

    return (
    <div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
        <form>
            <label>Email</label>
            <input type={"email"} />
            <label>Password</label>
            <input type={"password"} />
        </form>
        <button
        onClick={async () => await googleSignInHandler(navigate, setDefaultClaimsReq, server_url)}
        >Sign in with google</button>
    </div>
    )
}

export default LoginPage;