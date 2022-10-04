import image from '../assets/Gull_portrait_ca_usa.jpg'
import '../styles/PostList.css'

/*const postList = {
    Id: 1,
    postImage: image,
    postImageDescription: 'description image',
    postTextarea: 'voici un text'
}*/

fetch("http://localhost:3000/api/post")
.then(data => data.json())
.then( jsonListPost =>{
    for(let post of jsonListPost){
        document.querySelector(".grp-post").innerHTML +=`<div class="grp-post-block">
                                                        <img class='grp-post-image' src=${image} alt={${post.postImageDescription}}/>
                                                        <p class='grp-post-text-area'>${post.postTextarea}</p>
                                                        </div>`
    }
})

function PostList(){
    return(
    <div className='grp-post'>
    </div>
)}


export default PostList