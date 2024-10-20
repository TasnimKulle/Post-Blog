const blogForm=document.querySelector("#blog-form");
const postTitle=document.querySelector("#postTitle");
const postUrl=document.querySelector("#postUrl");
const postDesc=document.querySelector("#PostArea")
const postList=document.querySelector(".postList")

blogForm.addEventListener('submit',addPost);

function addPost(e){
    e.preventDefault();
    const titlePost= postTitle.value.trim();
    // const imgPost=postUrl.value.trim();
    // const descPost=postDesc.value.trim();
    if(titlePost !==''){
        const post={
            id:Date.now(),
            title:titlePost,
        }; 
        addPostToDOM(post);
    }
    
}
function addPostToDOM(post){
    const li=document.createElement('li')
    li.className='postItem'
    li.dataset.id=post.id;
    li.innerHTML=`
    <span class="tPost">${post.title}</span>
    
    `
    postList.appendChild(li)
  
}
