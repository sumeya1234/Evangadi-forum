import React, { useRef } from 'react'
import axios from "../../API/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
const LogIn = () => {
    const navigate = useNavigate();
    const emailDom = useRef();
    const passwordDom = useRef();
    async function handleSubmit(e){
        e.preventDefault();
            const emailValue = emailDom.current.value;
            const passwordValue = passwordDom.current.value;
            if(!emailValue || !passwordValue){
                alert("Please provide all required fields")
                return;
            }
        try {
            const {data} = await axios.post("/users/login", {
                email :emailValue, 
                password : passwordValue
            });
            alert("Logged in successfully.");
            localStorage.setItem("token", data.token)
            navigate("/");
        } catch (error) {
            alert(error?.response?.data?.message);
            console.log(error.response)
        }
    }
    return (
        <>
            <section>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <span>Email</span>
                        <input type="text" placeholder='Email'ref={emailDom}/>
                    </div><br/>
                    <div>
                        <span>Password</span>
                        <input type="text" placeholder='Password'ref={passwordDom} />
                    </div><br/>
                    <button type="submit">Log in</button>
                </form>
                <Link to={"/register"}>Register</Link>
            </section>
        </>
    )
}

export default LogIn
