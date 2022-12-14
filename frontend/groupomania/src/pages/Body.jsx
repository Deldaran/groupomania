import '../styles/Body.scss'
import '../styles/PostList.scss'
import PostList from './PostList';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Banner from '../pages/Banner'
import { useState } from 'react';



library.add(faPaperclip);
//créer la partie centrale et le formulaire
function Body() {
    const [data, setData] = useState('');
    const [image,setImage]= useState('');
    const [fileDataURL, setFileDataURL] = useState(null);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const handleDataChange = event => {
      setData(event.target.value);
    };
    //Récupére l'image choisi
    const handleImageChange = event => {
         const file = event.target.files[0]
         if(!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
          }
        setImage({
            image: file
        });
        setFileDataURL(URL.createObjectURL(file));
    }
    //créer le post
    const creatpostData = async(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", image.image);
        const user = JSON.parse(localStorage.getItem('user'));
        const postData = {
            userId: user.userId,
            token: user.token,
            email: user.email,
            postTextarea: data,
        }
        formData.append("data",JSON.stringify(postData))
        try{
            const res = await fetch('http://localhost:3000/post',{
                method: 'POST',
                headers:{
                    'Authorization': 'Bearer ' + postData.token
                },
                body: formData
                })
                .then(res => res.json());
        }
        catch(err){
            alert("Veuillez insérer une image.");
        }
        window.location.reload();
        
    }
    return(
        <div>
            <Banner/>
            <div className='grp-body'>
                <form className='grp-body-post' encType='multipart/form-data'  >
                <div className='grp-body-post-preview'><img src={fileDataURL}/></div>
                    <textarea className='grp-body-post-text'onChange={handleDataChange} name='grp-body-post-text' placeholder='Écrivez votre post'/>
                    <div className='grp-body-btn'>
                        <label className='grp-body-btn-file'>
                            Insérer image
                            <input  className='grp-body-btn-file-upload' type="file" onInput={handleImageChange} />
                        </label>
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