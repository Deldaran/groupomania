import '../styles/Body.scss'
import '../styles/PostList.scss'
import PostList from './PostList';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Banner from './Banner'
import { useState , useEffect } from 'react';




library.add(faPaperclip);
//créer la partie centrale et le formulaire
function Body() {
    const [data, setData] = useState('');

    const handleDataChange = event => {
      setData(event.target.value);
    };
    const creatpostData = async()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        const postData = {
            userId: user.userId,
            token: user.token,
            postTextarea: data
        }
        try{
            const res = await fetch('http://localhost:3000/post',{
                method: 'POST',
                headers:{
                    'content-Type':'application/json',
                    'Authorization': 'Bearer ' + postData.token
                },
                body: JSON.stringify(postData)
                });
                
        }
        catch(err){}
    }
    return(
        <div>
            <Banner/>
            <div className='grp-body'>
                <form className='grp-body-post'>
                    <textarea className='grp-body-post-text'onChange={handleDataChange} name='grp-body-post-text' placeholder='écriver votre post'/>
                    <div className='grp-body-btn'>
                        <button className='grp-body-btn-post'><FontAwesomeIcon icon="fa-solid fa-paperclip" />insérer une image</button>
                        <button className='grp-body-btn-post' onClick={creatpostData} >Poster</button>
                    </div>
                </form>
                <div className='grp-ligne'/>
                <PostList/>
            </div>
        </div>
    )
}

export default Body