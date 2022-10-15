import image from '../assets/Gull_portrait_ca_usa.jpg'
import { useState } from 'react';
import { useEffect } from 'react'
import '../styles/PostList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'

// fetch("http://localhost:3000/api/post")
// .then(data => data.json())
// .then( jsonListPost =>{
//     for(let post of jsonListPost){
//         document.querySelector(".grp-post").innerHTML +=`<div class="grp-post-block">
//                                                             <div class="grp-post-block-1">
//                                                                 <img class='grp-post-block-1-image' src=${image} alt={${post.postImageDescription}}/>
//                                                                 <p class='grp-post-block-1-text-area'>${post.postTextarea}</p>
//                                                             </div>
//                                                             <div class="grp-post-block-2">
//                                                                 <button class="grp-post-block-2-btn-like"><FontAwesomeIcon icon="fa-solid fa-thumbs-up" />like</button>
//                                                                 <button class="grp-post-block-2-btn-dislike">dislike</button>
//                                                                 <button class="grp-post-btn-custom">modifiez</button>
//                                                             </div>
//                                                         </div>`
//     }
// })
// .catch(error => {"error"})
// function post() {
//     const names =[]
//     const studentDetails = []
//     studentDetails.forEach((data) => {
//         names.push(<h3 className='student_name'>{data}</h3>)
//     })

//     return (
//         <div className='container'>
//         {names}
//         </div>
//     )
// }




function PostList(){
   const [post,setPost] = useState();
    const getApiData = async ()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const postData = {
        userId: user.userId,
        token: user.token,
    }
        const response = await fetch("http://localhost:3000/post",{
            method:'GET',
            headers:{
                'content-Type':'application/json',
                'Authorization': 'Bearer ' + postData.token
            }
        })
        .then((response => response.json()));
        setPost(response);
    }
    useEffect(() => {
        getApiData();
      }, []);
return(
    <div className='container'>
        {post && post.map((post)=>
        <div className="grp-post-block" key={post._id}>
            <div className="grp-post-block-1">
                <img className='grp-post-block-1-image' src={image} alt={post.postImageDescription}/>
                <p className='grp-post-block-1-text-area'>{post.postTextarea}</p>
            </div>
            <div className="grp-post-block-2">
                <button className="grp-post-block-2-btn-like"><FontAwesomeIcon icon={faThumbsUp} />like</button>
                <button className="grp-post-block-2-btn-dislike">dislike</button>
            <button className="grp-post-btn-custom">modifiez</button>
            </div>
        </div>
        )}
    </div>
)
}
export default PostList