import '../styles/Banner.css'
import logo from '../assets/icon-left-font.png'

function Banner(){
   return(<div className='grp-banner'>
                <img src = {logo} alt= 'groupomania' className='grp-logo' />
                <div className="grp-account">
                    <h1 className="grp-account-title">pseudo compte</h1>
                    <ul className="grp-account-userpref">
                        <li>inscrit toi</li>
                        <li>connécte toi</li>
                    </ul>
                </div>
            </div>
        )
};
export default (Banner)
