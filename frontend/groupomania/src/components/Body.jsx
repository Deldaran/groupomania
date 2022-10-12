import '../styles/Body.scss'
import '../styles/PostList.scss'
import PostList from './PostList';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Login } from '../pages/Login';
import Banner from './Banner'
import {useAuth} from "../hooks/useAuth"

library.add(faPaperclip);
//créer la partie centrale et le formulaire
function Body() {
    return(
        <div>
            <Banner/>
            <div className='grp-body'>
                <form className='grp-body-post'>
                    <textarea className='grp-body-post-text' name='grp-body-post-text' placeholder='écriver votre post'/>
                    <div className='grp-body-btn'>
                        <button className='grp-body-btn-post'><FontAwesomeIcon icon="fa-solid fa-paperclip" />insérer une image</button>
                        <button className='grp-body-btn-post'>Poster</button>
                    </div>
                </form>
                <div className='grp-ligne'/>
                <PostList/>
            </div>
        </div>
    )
}

export default Body