import '../styles/Banner.scss'
import logo from '../assets/icon-left-font.png'
import { useAuth } from "../hooks/useAuth";

//créé la bannier avec logo et compte
export default function Banner(){
const { logout} = useAuth();

   return(<div className='grp-banner'>
                <img src = {logo} alt= 'groupomania' className='grp-banner-logo' />
                <div className='grp-banner-compte'>
                    <h1>Compte</h1>
                    <button onClick={logout} className='grp-banner-compte-btn'>Deconnectez-vous</button>
                </div>
            </div>
        )
};
