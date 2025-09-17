document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('blog-posts-container');

    fetch('./blogs/posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('article');
                postElement.classList.add('blog-post');
                postElement.innerHTML = `
                    <h2 class="post-title">${post.title}</h2>
                    <div class="post-meta">
                        <span>By ${post.author}</span>
                        <span>${post.date}</span>
                    </div>
                    <p class="post-content">${post.content}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the blog posts:', error);
            postsContainer.innerHTML = '<p>Sorry, we could not load the blog posts at this time.</p>';
        });
});