document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();

    const userForm = document.querySelector('#addUserForm');
    userForm.addEventListener('submit', addUserFormSubmitted);

   const postForm = document.querySelector('#addPostForm');
    postForm.addEventListener('submit', addPostSubmitted);
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/users/all`);
    const users = response.data.payload
    console.log(users)
    users.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age} -- User ID: ${user.id}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    loadUsers();
}


async function loadPosts() {
    const postsList = document.querySelector('#postsList');
    postsList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/posts/all`);
    const posts = response.data.payload
    console.log(posts)
    posts.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${post.body} -- User ID: ${post.poster_id}`;
        postsList.appendChild(listItem);
    });
}


async function addPostSubmitted (event) {
    event.preventDefault();    
    const poster_id = document.querySelector('#user_id').value;
    const text = document.querySelector('#post_text').value;
    let response = await axios.post(`http://localhost:3000/posts/add`, {poster_id, text});
    loadPosts();
}

