import React, { useRef } from 'react'
import axios from '../../API/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const userNameDom = useRef();
    const firstNameDom = useRef();
    const lastNameDom = useRef();
    const emailDom = useRef();
    const passwordDom = useRef();
    async function handleSubmit(e){
        e.preventDefault();
            const userNameValue = userNameDom.current.value;
            const firstNameValue = firstNameDom.current.value;
            const lastNameValue = lastNameDom.current.value;
            const emailValue = emailDom.current.value;
            const passwordValue = passwordDom.current.value;
            if(!userNameValue || !firstNameValue || !lastNameValue || !emailValue || !passwordValue){
                alert("Please provide all required fields")
                return;
            }
        try {
            await axios.post("/users/register", {
                username : userNameValue, 
                firstname : firstNameValue, 
                lastname : lastNameValue, 
                email :emailValue, 
                password : passwordValue
            });
            alert("Registered successfully. Please log in");
            navigate("/login");
        } catch (error) {
            alert("Something went wrong");
            console.log(error.response)
        }
    }
    return (
        <>
            <section>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <span>Username - </span>
                        <input type="text" placeholder='username' ref={userNameDom}/>
                    </div><br/>
                    <div>
                        <span>First name</span>
                        <input type="text" placeholder='First name' ref={firstNameDom}/>
                    </div><br/>
                    <div>
                        <span>Last name</span>
                        <input type="text" placeholder='Last name' ref={lastNameDom}/>
                    </div><br/>
                    <div>
                        <span>Email</span>
                        <input type="text" placeholder='Email'ref={emailDom}/>
                    </div><br/>
                    <div>
                        <span>Password</span>
                        <input type="text" placeholder='Password'ref={passwordDom} />
                    </div><br/>
                    <button type="submit">Register</button>
                </form>
                <Link to={"/login"}>Log in</Link>
            </section>
        </>
    )
}

export default Register
