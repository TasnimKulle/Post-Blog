const blogForm=document.querySelector("#blog-form");
const postTitle=document.querySelector("#postTitle");
const postUrl=document.querySelector("#postUrl");
const postDesc=document.querySelector("#postArea")
const postList=document.querySelector(".postList")

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
    <button class="edit-btn">Edit<button>
    <button class="delete-btn">Delete<button>
    </span>
    `;
    postList.appendChild(li)
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
document.addEventListener('DOMContentLoaded', function() {
    loadPost();
});
