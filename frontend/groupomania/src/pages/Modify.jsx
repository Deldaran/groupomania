import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import Banner from "../components/Banner"
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
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(!file.type.match(imageMimeType)) {
           alert("Image mime type is not valid");
           return;
         }
         setImage({
            image: file
        });
        setFileDataURL(URL.createObjectURL(file))
        setImage({
            image: e.target.files[0]
        })
    }
    const handleTextAreaChange = (e)=>{
        setTextarea(e.target.value)
    }
    const getOneApi = async () =>{
        const res = await fetch("http://localhost:3000/post/:"+ Id,{
            method:"GET",
            headers:{
                'content-Type':'application/json',
                'Authorization': 'Bearer ' + user.token ,
            },
        })
        .then(res => res.json());
         setModifyPost([res])
    }

    const modifyApi = async () =>{
       const formData = new FormData
       formData.append("file", image.image)
       
        const Data = {
            postTextarea : textAreaData,
        }
        formData.append("data", JSON.stringify(Data))
        try{
        const modifyRes = await fetch("http://localhost:3000/post/:"+ Id,{
            method:"PUT",
            headers:{
                'Authorization': 'Bearer ' + user.token ,
            },
            body : formData
        })
        .then(modifyRes = modifyRes.json())
        
        }
        catch(err){}
        }



    useEffect(() => {
        getOneApi();
      }, []);
      
    return(
        <div>
            <Banner/>
            {modifyPost && modifyPost.map((modifyPost)=>
                <div className='grp-body' key={modifyPost._id}>
                    <img className='grp-body-img' src={modifyPost.postImage} />
                    <label className="grp-body-file" >
                    Modifiez Image
                    <input className='grp-body-file-modify-btn' type="file" onInput={handleImageChange}></input>
                    </label>
                    <textarea className='grp-body-texarea'type="textarea" onChange={handleTextAreaChange} >{modifyPost.postTextarea}</textarea>
                    <button className='grp-body-btn-modify'onClick={modifyApi}>Modifiez</button>
            </div>
            )}
        </div>
    )
}