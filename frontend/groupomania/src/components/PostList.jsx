import image from '../assets/Gull_portrait_ca_usa.jpg'
import { useState } from 'react';
import { useEffect } from 'react'
import '../styles/PostList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { useAuth } from '../hooks/useAuth';

function PostList(){
    const [post,setPost] = useState();
    const [likes, setLikes] = useState({ likes : 0 , isClickedLike : false  });
    const [textAreaData,setTextarea] = useState();
    const user = JSON.parse(localStorage.getItem('user'))
    const postData = {
    userId: user.userId,
    token: user.token,
    }
    const getApiData = async ()=>{
    
        const response = await fetch("http://localhost:3000/post",{
            method:'GET',
            headers:{
                'content-Type':'application/json',
                'Authorization': 'Bearer ' + postData.token
            }
        })
        .then((response => response.json()))
        setPost(response);
    }
   

    const deleteApiData = async (e)=>{
        e.preventDefault()
        const searchItemIndex = parseInt(e.target.value, 10)
        const Data = {
            userId: user.userId,
            token: user.token,
            imageUrl:post[searchItemIndex].postImage,
        }
        const resDelete = await fetch(`http://localhost:3000/post/:`+ post[searchItemIndex]._id,{
        method:"DELETE",
        headers:{
            'content-Type':'application/json',
            'Authorization': 'Bearer ' + Data.token,
        },
        body: JSON.stringify(Data)
        })
        .then((res => res.json));
        window.location.reload();
    }

   
const handleClick = (e) => {
    const index = parseInt(e.target.value, 10)
    if(likes.isClickedLike == false){
        setLikes({ ...likes, likes : (post[index].likes + 1), isClicked : true})
        
    }
    else{
        setLikes({ ...likes, likes : (post[index].likes - 1), isClicked : false})
    }
}
const likeApi = async (e) =>{
    e.preventDefault()
    const index = parseInt(e.target[0].value, 10)
    console.log(e.target[0].value)
    const Data = {
        userId : user.userId,
        like : likes.likes,
        isClicked : likes.isClicked
    }
    const response = await fetch(`http://localhost:3000/post/:`+ post[index]._id +'/like',{
        method :'POST',
        headers:{
            'content-Type':'application/json',
            'Authorization': 'Bearer ' + user.token,
        },
        body: JSON.stringify(Data)
    })
    window.location.reload();
}
console.log(localStorage)
useEffect(() => {
    getApiData();
  }, []);
return(
    <div className='container'>
        {post && post.map((post,index)=>
        <div className="grp-post-block" key={post._id}>
            <div className="grp-post-block-1">
                <img className='grp-post-block-1-image' src={post.postImage} alt={post.postImageDescription}/>
                <p className='grp-post-block-1-text-area' >{post.postTextarea}</p>
            </div>
            <div className="grp-post-block-2">
                <div className="grp-post-block-2-btn-block-1">
                        <form onSubmit={likeApi} >
                            <button className={`grp-post-block-2-btn-like-${ post.isClicked &&'liked'}`} type ="submit" onClick={handleClick} value={index}><span>{ ` ${post.likes}` }</span><FontAwesomeIcon className={`grp-post-block-2-btn-like-${ post.isClicked &&'liked'}-icon`} icon={faThumbsUp} />J'aime</button>
                        </form>
                </div>
                <div className="grp-post-block-2-btn-block-2">
                        <button className="grp-post-block-2-btn-custom"><Link className="grp-post-block-2-btn-custom-link" to={"/dashboard/listmodify?"+(post._id)}>modifier</Link></button>
                        <button className='grp-post-block-2-btn-delete' onClick={deleteApiData} value={index}>supprimer</button>
                </div>
            </div>
        </div>
        )}
    </div>
)
}
export default PostList