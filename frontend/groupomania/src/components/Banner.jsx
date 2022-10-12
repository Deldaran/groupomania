import '../styles/Banner.scss'
import logo from '../assets/icon-left-font.png'
import { Route , Navigate, Link} from 'react-router-dom';
import { Login } from '../pages/Login';



export default function Banner(){
    const disconnect = () => {
        localStorage.clear();
        
    }
   return(<div className='grp-banner'>
                <img src = {logo} alt= 'groupomania' className='grp-banner-logo' />
                <div className='grp-banner-compte'>
                    <h1>Compte</h1>
                    <button  className='grp-banner-compte-btn'><Link onClick={disconnect} to='/login'>Deconnecter vous</Link></button>
                </div>
            </div>
        )
};
