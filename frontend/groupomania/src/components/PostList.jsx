import image from '../assets/Gull_portrait_ca_usa.jpg'
import { useState } from 'react';
import { useEffect } from 'react'
import '../styles/PostList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'


function PostList(){
   const [post,setPost] = useState();
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
        console.log(response)
    }
   

      const deleteApiData = async (e)=>{
        e.preventDefault()
        let searchItemIndex = parseInt(e.target.value, 10)
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
useEffect(() => {
    getApiData();
  }, []);
return(
    <div className='container'>
        {post && post.map((post,index)=>
        <div className="grp-post-block" key={post._id}>
            <div className="grp-post-block-1">
                <img className='grp-post-block-1-image' src={post.postImage} alt={post.postImageDescription}/>
                <p className='grp-post-block-1-text-area'>{post.postTextarea}</p>
            </div>
            <div className="grp-post-block-2">
                <div className="grp-post-block-2-btn-block-1">
                        <button className="grp-post-block-2-btn-like"><FontAwesomeIcon icon={faThumbsUp} />J'aime</button>
                        <button className="grp-post-block-2-btn-dislike">j'aime pas</button>
                </div>
                <div className="grp-post-block-2-btn-block-2">
                        <button className="grp-post-block-2-btn-custom">modifier</button>
                        <button className='grp-post-block-2-btn-delete' onClick={deleteApiData} value={index}>supprimer</button>
                </div>
            </div>
        </div>
        )}
    </div>
)
}
export default PostList