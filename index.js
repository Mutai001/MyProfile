// Function to handle adding a new blog post
function addBlogPost(title, content) {
    // Create a unique ID for the blog post
    const postId = `post_${Date.now()}`;

    // Create a new blog post object
    const newPost = {
        id: postId,
        title: title,
        content: content
    };

    // Store the blog post in localStorage
    localStorage.setItem(postId, JSON.stringify(newPost));

    // Add the blog post to the DOM
    renderBlogPost(newPost);
}

// Function to handle rendering a blog post
function renderBlogPost(post) {
    const blogPostsContainer = document.getElementById('blogPosts');

    // Create elements for the blog post
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.dataset.postId = post.id;

    const postTitle = document.createElement('h4');
    postTitle.textContent = post.title;

    const postContent = document.createElement('p');
    postContent.textContent = post.content;

    const shareButtons = document.createElement('div');
    shareButtons.classList.add('share-buttons');

    // Create share buttons
    const facebookButton = document.createElement('a');
    facebookButton.classList.add('facebook');
    facebookButton.textContent = 'Share on Facebook';
    facebookButton.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`;

    const twitterButton = document.createElement('a');
    twitterButton.classList.add('twitter');
    twitterButton.textContent = 'Share on Twitter';
    twitterButton.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(post.title)}`;

    const linkedinButton = document.createElement('a');
    linkedinButton.classList.add('linkedin');
    linkedinButton.textContent = 'Share on LinkedIn';
    linkedinButton.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(post.title)}`;

    const emailButton = document.createElement('a');
    emailButton.classList.add('email');
    emailButton.textContent = 'Share via Email';
    emailButton.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.content)}\n\nRead more at: ${encodeURIComponent(location.href)}`;

    // Append buttons to shareButtons div
    shareButtons.appendChild(facebookButton);
    shareButtons.appendChild(twitterButton);
    shareButtons.appendChild(linkedinButton);
    shareButtons.appendChild(emailButton);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        deleteBlogPost(post.id);
    });

    // Append elements to post
    postElement.appendChild(postTitle);
    postElement.appendChild(postContent);
    postElement.appendChild(shareButtons);
    postElement.appendChild(deleteButton);

    // Append post to blogPosts div
    blogPostsContainer.appendChild(postElement);
}

// Function to handle deleting a blog post
function deleteBlogPost(postId) {
    // Remove the blog post from localStorage
    localStorage.removeItem(postId);

    // Remove the blog post from the DOM
    const postElement = document.querySelector(`.blog-post[data-post-id="${postId}"]`);
    if (postElement) {
        postElement.remove();
    }
}

// Event listener for submitting the blog form
document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Add the new blog post
    addBlogPost(title, content);

    // Clear form inputs
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});

// Function to load existing blog posts from localStorage on page load
function loadBlogPosts() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith('post_')) {
            const post = JSON.parse(localStorage.getItem(key));
            renderBlogPost(post);
        }
    });
}

// Load existing blog posts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});