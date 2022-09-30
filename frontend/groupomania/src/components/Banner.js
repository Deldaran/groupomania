import '../styles/Banner.css'
import logo from '../assets/icon-left-font.png'

function Banner(){
    const title = 'groupomania'
   return(<div className='grp-banner'>
                <img src = {logo} alt= 'groupomania' className='grp-logo' />
                <h1 className='grp-title'>{title}</h1>
            </div>
        )
};

export default Banner
