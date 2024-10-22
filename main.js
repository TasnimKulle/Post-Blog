const blogForm = document.querySelector("#blog-form");
const postTitle = document.querySelector("#postTitle");
const postUrl = document.querySelector("#postUrl");
const postDesc = document.querySelector("#postArea");
const postList = document.querySelector(".postList");

window.onload = function() {
    loadPost();
}

blogForm.addEventListener('submit', addPost);

function addPost(e) {
    e.preventDefault();
    const titlePost = postTitle.value.trim();
    const imgPost = postUrl.value.trim();
    const descPost = postDesc.value.trim();

    if (titlePost !== '' && imgPost !== '' && descPost !== '') {
        const post = {
            id: Date.now(),
            title: titlePost,
            picture: imgPost,
            desc: descPost,
        };
        addPostToDOM(post);
        saveToLocalStorage(post);
    }
}

function addPostToDOM(post) {
    const li = document.createElement('li');
    li.className = 'postItem';
    li.dataset.id = post.id;
    li.innerHTML = `
        <h4 class="tPost">${post.title}</h4>
        <img class="picPost" src="${post.picture}">
        <p class="desc">${post.desc}</p>
        <span class="btn">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </span>
    `;
    postList.appendChild(li);
    attachEventListeners(li, post);
}

function loadPost() {
    const posts = getFromLocalStorage();
    posts.forEach(post => {
        addPostToDOM(post);
    });
}

function attachEventListeners(li, post) {
    const editBtn = li.querySelector('.edit-btn');
    const dltBtn = li.querySelector('.delete-btn');
    editBtn.addEventListener('click', function() {
        handleEdit(post.id, li);
    });
    dltBtn.addEventListener('click', function() {
        handleDelete(post.id, li);
    });
}

function handleDelete(postId, li) {
    deletePost(postId);
    li.remove();
}

function deletePost(id) {
    const posts = getFromLocalStorage();
    const updatedPosts = posts.filter(post => post.id != id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
}

function handleEdit(postId, li) {
    const tpost = li.querySelector(".tPost");
    const picPost = li.querySelector(".picPost");
    const desc = li.querySelector(".desc");

    // Prompt for new values
    const newTitle = prompt("Edit Your Post Title", tpost.textContent);
    const newPic = prompt("Edit Your Picture URL", picPost.src);
    const newDesc = prompt("Edit Your Description", desc.textContent);

    if (newTitle !== null && newTitle.trim() !== '') {
        const newPost = {
            title: newTitle,
            picture: newPic,
            desc: newDesc
        };

        tpost.textContent = newTitle;
        if (newPic !== null) {
            picPost.setAttribute('src', newPic);
        }
        if (newDesc !== null) {
            desc.textContent = newDesc;
        }
        updatePost(postId, newPost);
    }
}

function updatePost(id, newPost) {
    const posts = getFromLocalStorage();
    const post = posts.find(post => post.id == id);
    
    if (post) {
        post.title = newPost.title || post.title;
        post.picture = newPost.picture || post.picture; 
        post.desc = newPost.desc || post.desc; 
        
        localStorage.setItem('posts', JSON.stringify(posts));
    }
}

function getFromLocalStorage() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

function saveToLocalStorage(post) {
    const posts = getFromLocalStorage();
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}
