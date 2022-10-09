import { Link } from "react-router-dom"
import Banner from "../components/Banner"
import "../styles/Banner.css"

export function Login() {
    return (
        <div className="grp-banner">
            <Banner/>
            <div className="grp-account">
                <form className="grp-account-form">
                    <input type="email" placeholder="entrer email"/>
                    <input type="password" placeholder="entrer le mots de passe" />
                </form>
                <div>
                    <button>Login</button>
                    <Link to="/SignUp">SignUp</Link>
                </div>
            </div>

        </div>
    )
}
export function SignUp(){
    return(
    <div>
        <Banner/>
        <div className="grp-account">
            <form>
                <input type="email" placeholder="entrer email"/>
                <input type="password" placeholder="entrer le mots de passe" />
            </form>
            <div>
                <button>SignUp</button>
                <Link to="/Login">Login</Link>
            </div>
        </div>
    </div>
    )
}
