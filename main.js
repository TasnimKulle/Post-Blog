const blogForm=document.querySelector("#blog-form");
const postTitle=document.querySelector("#postTitle");
const postUrl=document.querySelector("#postUrl");
const postDesc=document.querySelector("#postArea")
const postList=document.querySelector(".postList")
window.onload = function(){
    loadPost()
}

blogForm.addEventListener('submit',addPost);

function addPost(e){
    e.preventDefault();
    const titlePost= postTitle.value.trim();
    const imgPost=postUrl.value.trim();
    const descPost=postDesc.value.trim();
    if(titlePost !=='' && imgPost !== '' && descPost !==''){
        const post={
            id:Date.now(),
            title:titlePost,
            picture:imgPost,
            desc:descPost,
        }
    addPostToDOM(post);
    console.log(post)
    saveToLocalStorage(post)
   
}
}


function addPostToDOM(post){
    const li=document.createElement('li')
    li.className='postItem'
    li.dataset.id=post.id;
    li.innerHTML=`
    <span class="tPost">${post.title}</span>
    <img class="picPost" src="${post.picture}">
    <p class="desc">${post.desc}</p>
    <span class="btn">
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    </span>
    `;
    postList.appendChild(li)
    attachEventListeners(li,post)
}
function loadPost(){
    const posts=getFromLocalStorege();
    posts.forEach(post => {
        addPostToDOM(post)
        console.log(post)
        
    })
}
function getFromLocalStorege(){
 const posts=localStorage.getItem('posts')
    return posts ? JSON.parse(posts):[]
}
function saveToLocalStorage(post){
    const posts=getFromLocalStorege()
    posts.push(post)
    localStorage.setItem("posts",JSON.stringify(posts))
}

function attachEventListeners(li,post){
    const editBtn=li.querySelector('.edit-btn');
    const dltBtn=li.querySelector('.delete-btn');
    editBtn.addEventListener('click',function(){
        handleEdit(post.id,li)
    });
}
function handleEdit(postId,li){
    const tpost=li.querySelector(".tpost")
    const picPost=li.querySelector(".picPost");
    const  desc=li.querySelector(".desc");
    const newPostTitle=prompt("Edit Your  Post",tpost.textContent,picPost.textContent,desc.textContent);
    if(newPostTitle!==null && newPostTitle.trim()!==''){
        updatePost(postId,newPostTitle);
        tpost.textContent= newPostTitle
    }
}
function updatePost(id,newPost){
    const posts=getFromLocalStorege()
    const post=posts.find(post=>post.id==id)
    if(post){
        post.title=newPost
        post.picPost=newPost
        post.desc=newPost
        localStorage.setItem('posts',JSON.stringify(posts))
    }

}
