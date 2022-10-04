import '../styles/Body.css'
import '../styles/PostList.css'
import PostList from './PostList';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

library.add(faPaperclip);
//créer la partie centrale et le formulaire
function Body() {
    return(
        <div className='grp-body'>
            <form id='grp-post'>
                <textarea id='grp-post-text' name='grp-post-text' placeholder='écriver votre post'/>
                <div id='grp-list-btn'>
                    <button className='btn-post'><FontAwesomeIcon icon="fa-solid fa-paperclip" />insérer une image</button>
                    <button className='btn-post'>Poster</button>
                </div>
            </form>
            <div id='grp-separate-ligne'></div>
            <PostList/>
        </div>
    )
}

export default Body