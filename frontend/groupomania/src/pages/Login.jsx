import { Link } from "react-router-dom"
import "../styles/Log.scss"
import logo from '../assets/icon-left-font.png'
import {useAuth} from '../hooks/useAuth'
//permet de connecter l'utilisateur 
export function Login({setToken}) {
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
                    <input className="grp-account-form-input" name="email" type="email"  placeholder="Entrer email"/>
                    <input className="grp-account-form-input" name="password" type="password" placeholder="Entrer le mots de passe" />
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
//permet de créer l'utilisateur 
export function SignUp(setToken){
    const { signUp } = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        signUp({
          email: data.get("email"),
          password: data.get("password")
        });
      };

    return(
    <div>
        <div className="grp-account">
        <div className="grp-logo"><img src = {logo} alt= 'groupomania' className='grp-image-logo' /></div>
            <h1>Inscription</h1>
            <form className="grp-account-form" onSubmit={handleSubmit} >
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
};


