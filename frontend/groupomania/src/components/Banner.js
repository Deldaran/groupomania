import '../styles/Banner.css'
import logo from '../assets/icon-left-font.png'

function Banner(){
   return(<div className='grp-banner'>
                <img src = {logo} alt= 'groupomania' className='grp-logo' />
                <div>
                    <h1>pseudo compte</h1>
                    <ul>
                        <li>mon compte</li>
                        <li>mes preférence</li>
                    </ul>
                </div>
            </div>
        )
};

export default Banner
