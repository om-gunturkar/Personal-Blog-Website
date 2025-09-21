document.addEventListener("DOMContentLoaded", () => {
  // Default blog posts (these will always exist)
  const defaultBlogPosts = [
    {
      title: "Getting Started with HTML",
      excerpt:
        "HTML is the backbone of the web. Learn the basics of creating your first web page with HTML tags.",
      category: "Web Development",
      image:
        "https://via.placeholder.com/400x250/6a5acd/ffffff?text=HTML+Basics",
      content:
        "HyperText Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. This post covers the essential tags like `<h1>`, `<p>`, and `<a>`.",
    },
    {
      title: "Styling with CSS Flexbox",
      excerpt:
        "CSS Flexbox is a one-dimensional layout method for arranging items in rows or columns. It makes building complex layouts much easier.",
      category: "Web Development",
      image:
        "https://via.placeholder.com/400x250/6a5acd/ffffff?text=Flexbox+Guide",
      content:
        "The Flexible Box Module, usually referred to as flexbox, was designed as a one-dimensional layout model, and as a method that could offer a flexible and efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown or dynamic.",
    },
    {
      title: "Introduction to JavaScript",
      excerpt:
        "JavaScript is a programming language that makes web pages interactive. From simple animations to complex web applications, JavaScript is key.",
      category: "Web Development",
      image:
        "https://via.placeholder.com/400x250/6a5acd/ffffff?text=JavaScript+Intro",
      content:
        "JavaScript, often abbreviated as JS, is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. It is used to create dynamic and interactive content on web pages.",
    },
    {
      title: "Understanding Git and GitHub",
      excerpt:
        "Git is a version control system that helps track changes in code. GitHub is a platform to host and collaborate on Git repositories.",
      category: "AI/ML",
      image:
        "https://via.placeholder.com/400x250/6a5acd/ffffff?text=Git+GitHub",
      content:
        "Git is a distributed version-control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files. GitHub is a web-based hosting service for version control using Git. It is a social coding platform that provides a graphical interface for developers.",
    },
    {
      title: "Introduction to Machine Learning",
      excerpt:
        "A basic guide to the world of machine learning, from supervised to unsupervised learning and beyond.",
      category: "AI/ML",
      image:
        "https://via.placeholder.com/400x250/6a5acd/ffffff?text=Machine+Learning",
      content:
        "Machine learning is a subset of artificial intelligence that provides systems with the ability to automatically learn and improve from experience without being explicitly programmed.",
    },
    {
      title: "Building a Portfolio with React",
      excerpt:
        "Learn how to create a professional and responsive portfolio website using the React library.",
      category: "Web Development",
      image:
        "https://via.placeholder.com/400x250/6a5acd/ffffff?text=React+Portfolio",
      content:
        "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.",
    },
  ];

  let customBlogPosts =
    JSON.parse(localStorage.getItem("customBlogPosts")) || [];
  let allBlogPosts = [...customBlogPosts, ...defaultBlogPosts];

  const postsContainer = document.getElementById("blog-posts-container");
  const isHomePage = document.querySelector(".latest-blogs-section");
  const viewAllLink = document.getElementById("viewAllBlogsLink");
  const viewLessLink = document.getElementById("viewLessBlogsLink");
  const addPostForm = document.getElementById("add-post-form");
  const editPostForm = document.getElementById("edit-post-form"); // New form
  const messageDiv = document.getElementById("message");

  function renderPosts(postsToRender) {
    if (!postsContainer) return;

    postsContainer.innerHTML = "";
    postsToRender.forEach((post) => {
      const encodedTitle = encodeURIComponent(post.title);

      const postElement = document.createElement("div");
      postElement.classList.add("blog-post");

      postElement.innerHTML = `
                ${
                  post.image
                    ? `<img src="${post.image}" alt="${post.title}" style="width:100%; height:200px; object-fit:cover; border-radius:8px; margin-bottom:15px;">`
                    : ""
                }
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="/components/blogs/edit.html?title=${encodedTitle}" class="read-more">Read More & Edit</a>
            `;

      postsContainer.appendChild(postElement);
    });
  }

  // Initial rendering logic
  if (postsContainer) {
    if (isHomePage) {
      const initialPosts = allBlogPosts.slice(0, 3);
      renderPosts(initialPosts);
      if (viewLessLink) viewLessLink.style.display = "none";
    } else {
      renderPosts(allBlogPosts);
      if (viewAllLink) viewAllLink.style.display = "none";
      if (viewLessLink) viewLessLink.style.display = "none";
    }
  }

  // Event listener for "View All Blogs"
  if (viewAllLink) {
    viewAllLink.addEventListener("click", (event) => {
      event.preventDefault();
      renderPosts(allBlogPosts);
      viewAllLink.style.display = "none";
      if (viewLessLink) viewLessLink.style.display = "inline-block";
      document
        .querySelectorAll(".category-tag")
        .forEach((tag) => tag.classList.remove("active"));
      document.querySelector(".category-tag").classList.add("active");
    });
  }

  // Event listener for "Show Less"
  if (viewLessLink) {
    viewLessLink.addEventListener("click", (event) => {
      event.preventDefault();
      const initialPosts = allBlogPosts.slice(0, 3);
      renderPosts(initialPosts);
      viewLessLink.style.display = "none";
      if (viewAllLink) viewAllLink.style.display = "inline-block";
      document
        .querySelectorAll(".category-tag")
        .forEach((tag) => tag.classList.remove("active"));
      document.querySelector(".category-tag").classList.add("active");
    });
  }

  // Category filtering logic
  const categoryTags = document.querySelectorAll(".category-tag");
  categoryTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const category = tag.textContent;
      categoryTags.forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");
      let filteredPosts = [];
      if (category === "All") {
        filteredPosts = isHomePage ? allBlogPosts.slice(0, 3) : allBlogPosts;
        if (isHomePage) {
          if (viewAllLink)
            viewAllLink.style.display =
              allBlogPosts.length > 3 ? "inline-block" : "none";
          if (viewLessLink) viewLessLink.style.display = "none";
        }
      } else {
        filteredPosts = allBlogPosts.filter(
          (post) => post.category === category
        );
        if (viewAllLink) viewAllLink.style.display = "none";
        if (viewLessLink) viewLessLink.style.display = "none";
      }
      renderPosts(filteredPosts);
    });
  });

  // Handle new post submission
  // Handle new post submission
// Handle new post submission
    if (addPostForm) {
        const publishButton = addPostForm.querySelector('button[type="submit"]');

        addPostForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newPost = {
                title: document.getElementById('post-title').value,
                excerpt: document.getElementById('post-subject').value,
                category: document.getElementById('post-category').value,
                image: document.getElementById('post-image').value || 'https://via.placeholder.com/400x250/9c27b0/ffffff?text=New+Blog',
                content: document.getElementById('post-description').value
            };
            customBlogPosts.unshift(newPost);
            localStorage.setItem('customBlogPosts', JSON.stringify(customBlogPosts));
            
            // Provide instant feedback and change button state
            if (messageDiv) {
                messageDiv.textContent = 'Post published successfully! Redirecting To HOME Page.';
                publishButton.textContent = 'Published!';
                publishButton.disabled = true; // Disable the button to prevent double-submitting
                publishButton.style.backgroundColor = '#28a745'; // Change color to green

                setTimeout(() => {
                    messageDiv.textContent = '';
                    publishButton.textContent = 'Publish Post';
                    publishButton.disabled = false;
                    publishButton.style.backgroundColor = ''; // Revert to original style
                    window.location.href = '../../index.html'; // Redirect to the home page
                }, 2000);
            }
            addPostForm.reset();
        });
    }

  // New logic to handle the edit form
  if (editPostForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const postTitle = decodeURIComponent(urlParams.get("title"));
    const postToEdit = allBlogPosts.find((post) => post.title === postTitle);

    if (postToEdit) {
      // Populate form fields with the existing data
      document.getElementById("post-title").value = postToEdit.title;
      document.getElementById("post-subject").value = postToEdit.excerpt;
      document.getElementById("post-category").value = postToEdit.category;
      document.getElementById("post-image").value = postToEdit.image;
      document.getElementById("post-description").value = postToEdit.content;
      document.getElementById(
        "edit-post-title-header"
      ).textContent = `Edit "${postToEdit.title}"`;

      editPostForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Find the index of the post in the customBlogPosts array
        const postIndex = customBlogPosts.findIndex(
          (post) => post.title === postTitle
        );

        if (postIndex !== -1) {
          // Update the post with new data
          customBlogPosts[postIndex] = {
            title: document.getElementById("post-title").value,
            excerpt: document.getElementById("post-subject").value,
            category: document.getElementById("post-category").value,
            image: document.getElementById("post-image").value,
            content: document.getElementById("post-description").value,
          };
          localStorage.setItem(
            "customBlogPosts",
            JSON.stringify(customBlogPosts)
          );
        }

        if (messageDiv) {
          messageDiv.textContent = "Post updated successfully!";
          setTimeout(() => {
            messageDiv.textContent = "";
            window.location.href = "../../index.html"; // Redirect to the home page
          }, 2000);
        }
      });
    }
  }

  // Contact form handler
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! I will get back to you shortly.");
      contactForm.reset();
    });
  }
});
