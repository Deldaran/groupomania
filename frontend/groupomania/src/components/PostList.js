import image from '../assets/Gull_portrait_ca_usa.jpg'
import '../styles/PostList.css'

fetch("http://localhost:3000/api/post")
.then(data => data.json())
.then( jsonListPost =>{
    for(let post of jsonListPost){
        document.querySelector(".grp-post").innerHTML +=`<div class="grp-post-block">
                                                            <div class="grp-post-block-1">
                                                                <img class='grp-post-image' src=${image} alt={${post.postImageDescription}}/>
                                                                <p class='grp-post-text-area'>${post.postTextarea}</p>
                                                            </div>
                                                            <div class="grp-post-block-2">
                                                                <button class="grp-btn-like"><FontAwesomeIcon icon="fa-solid fa-thumbs-up" />like</button>
                                                                <button class="grp-btn-dislike">dislike</button>
                                                                <button class="grp-btn-custom">modifiez</button>
                                                            </div>
                                                        </div>`
    }
})
.catch(error => {error})

function PostList(){
    return(
    <div className='grp-post'>
    </div>
)}



export default PostList