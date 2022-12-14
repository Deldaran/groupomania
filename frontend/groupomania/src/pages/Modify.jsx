import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import Banner from "./Banner"
import "../styles/Modify.scss"




export function Modify(){
    const [modifyPost,setModifyPost] = useState();
    const [textAreaData,setTextarea] = useState();
    const [fileDataURL, setFileDataURL] = useState(null);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const [image,setImage]= useState();
    const Url = window.location.href;
    const Id = Url.substring((Url.lastIndexOf('?') + 1));
    const user = JSON.parse(localStorage.getItem('user'))
    //permet de récupérer l'image choisi
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(!file.type.match(imageMimeType)) {
           alert("Image mime type is not valid");
           return;
         };
        setFileDataURL(URL.createObjectURL(file));
        setImage({
            image: file
        })
    }
    //récupere le text
    const handleTextAreaChange = (e)=>{
        setTextarea(e.target.value)
    }
    //recuper les données du serveur
    const getOneApi = async () =>{
        const res = await fetch("http://localhost:3000/post/:"+ Id,{
            method:"GET",
            headers:{
                'content-Type':'application/json',
                'Authorization': 'Bearer ' + user.token ,
            },
        })
        .then(res => res.json());
         setModifyPost([res]);
         setTextarea(res.postTextarea);
         setImage({image : false});
         setFileDataURL(res.postImage);
    }
    //permet la modification du post
    const modifyApi = async () =>{
       const formData = new FormData()
       formData.append("file", image.image)
        const Data = {
            postTextarea : textAreaData,
        }
        formData.append("data", JSON.stringify(Data))
         const modifyRes = await fetch("http://localhost:3000/post/:"+ Id,{
            method:"PUT",
            headers:{
                'Authorization': 'Bearer ' + user.token ,
            },
            body : formData
        })
        .then(modifyRes => modifyRes.json());
        if(modifyRes.message == 'Not authorized'){
            alert("Vous n'avais pas le droit de modifier ce poste")
        }
        
    }


    useEffect(() => {
        getOneApi();
      }, []);
      
    return(
        <div>
            <Banner/>
            {modifyPost && modifyPost.map((modifyPost)=>
                <div className='grp-body' key={modifyPost._id}>
                    <img className='grp-body-img' src={fileDataURL} />
                    <label className="grp-body-file" >
                    Modifier Image
                    <input className='grp-body-file-modify-btn' type="file" onInput={handleImageChange}></input>
                    </label>
                    <textarea className='grp-body-texarea'type="textarea" onChange={handleTextAreaChange} value={textAreaData}></textarea>
                    <button className='grp-body-btn-modify'onClick={modifyApi}><Link className='grp-body-btn-modify-link' to={'/dashboard/list'}>Modifier</Link></button>
            </div>
            )}
        </div>
    )
}