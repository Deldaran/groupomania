import { Link } from "react-router-dom"
import Banner from "../components/Banner"
import "../styles/Log.scss"
import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import logo from '../assets/icon-left-font.png'
import {useAuth} from '../hooks/useAuth'
// async function loginUser(credentials){
//     return fetch('http://localhost:3000/auth/login',{
//         method : 'POST',
//         headers:{'content-Type':'application/json'},
//         body: JSON.stringify(credentials)
//     })
//     .then(data => data.json())

// }

//app call api login car reponse /login du serv
async function signUpUser(credentials){
    return fetch('http://localhost:3000/auth/signup',{
        method: 'POST',
        headers:{
            'content-Type':'application/json'
        },
        body: JSON.stringify(credentials)
        })
        .then(data => data.json())
        
}
export function Login({setToken}) {
    
    // const [email,setEmail] = useState();
    // const [password,setPassword] = useState();
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //         email,
    //         password
    //     });
    //     setToken(token);
    //   }
    const { login } = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login({
          email: data.get("email"),
          password: data.get("password")
        });
      };
    return (
            
            <div className="grp-account">
                <div className="grp-logo"><img src = {logo} alt= 'groupomania' className='grp-image-logo' /></div>
                <h1>Connexion</h1>
                <form className="grp-account-form" onSubmit={handleSubmit}>
                    <input className="grp-account-form-input" name="email" type="email"  placeholder="entrer email"/>
                    <input className="grp-account-form-input" name="password" type="password" placeholder="entrer le mots de passe" />
                    <div className="grp-account-form-divbtn">
                        <button className="grp-account-form-btn" type="submit">Login</button>
                        <button className="grp-account-form-btn" ><Link to="/SignUp">SignUp</Link></button>
                    </div>
                </form>
                <div>
                </div>
            </div>
    )
}
export function SignUp(setToken){
    // const [email,setEmail] = useState();
    // const [password,setPassword] = useState();
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await signUpUser({
    //       email,
    //       password
    //     });
    //     setToken(token);
    //   }
    return(
    <div>
        <div className="grp-account">
        <div className="grp-logo"><img src = {logo} alt= 'groupomania' className='grp-image-logo' /></div>
            <h1>Inscription</h1>
            <form className="grp-account-form" >
                <input id="grp-account-form-email" name="email" type="email" placeholder="entrer email"/>
                <input id="grp-account-form-password" name="password" type="password" placeholder="entrer le mots de passe" />
                <div className="grp-account-form-divbtn">
                    <button className="grp-account-form-btn" type="submit">SignUp</button>
                    <button className="grp-account-form-btn" ><Link className="grp-account-form-btn" to="/">Login</Link></button>
                </div>
            </form>
        </div>
    </div>
    )
}


