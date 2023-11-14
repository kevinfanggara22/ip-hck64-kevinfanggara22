// import {useEffect} from "react";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    return(
        <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />
    )
}