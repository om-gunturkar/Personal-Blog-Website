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
        "HyperText Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. This post covers the essential tags like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, and <code>&lt;a&gt;</code>.",
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

  // Get common page elements
  const postsContainer = document.getElementById("blog-posts-container");
  const isHomePage = document.querySelector(".latest-blogs-section");
  const viewAllLink = document.getElementById("viewAllBlogsLink");
  const viewLessLink = document.getElementById("viewLessBlogsLink");
  const addPostForm = document.getElementById("add-post-form");
  const editPostForm = document.getElementById("edit-post-form");
  const messageDiv = document.getElementById("message");

  // A function to display a custom alert message
  function showCustomAlert(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px;
            border-radius: 8px;
            color: white;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            font-weight: bold;
            background-color: ${type === "success" ? "#28a745" : "#dc3545"};
        `;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Function to render blog posts on the main blog page
  // Function to render blog posts on the main blog page
  function renderPosts(postsToRender) {
    if (!postsContainer) return;

    postsContainer.innerHTML = "";
    postsToRender.forEach((post) => {
      const encodedTitle = encodeURIComponent(post.title);
      const postElement = document.createElement("div");

      postElement.classList.add("post-card");

      postElement.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-overlay">
        <a href="./components/blogs/view.html?title=${encodedTitle}">Read More →</a>
      </div>
      <div class="post-card-content">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
    `;
      postsContainer.appendChild(postElement);
    });
  }

  // --- Core Page Rendering & Logic ---
  // This block handles the main index and blog listing pages
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

  // --- Navigation and Filtering Logic ---
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

  // --- Add Post Form Logic ---
  if (addPostForm) {
    const publishButton = addPostForm.querySelector('button[type="submit"]');

    addPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (addPostForm.checkValidity()) {
        const newPost = {
          title: document.getElementById("post-title").value,
          excerpt: document.getElementById("post-subject").value,
          category: document.getElementById("post-category").value,
          image:
            document.getElementById("post-image").value ||
            "https://via.placeholder.com/400x250/9c27b0/ffffff?text=New+Blog",
          content: document.getElementById("post-description").value,
        };

        customBlogPosts.unshift(newPost);
        localStorage.setItem(
          "customBlogPosts",
          JSON.stringify(customBlogPosts)
        );

        if (messageDiv) {
          messageDiv.textContent = "Post published successfully!";
          messageDiv.style.color = "green";
          publishButton.textContent = "Published!";
          publishButton.disabled = true;
          publishButton.style.backgroundColor = "#28a745";

          setTimeout(() => {
            window.location.href = "../../index.html";
          }, 2000);
        }

        addPostForm.reset();
        addPostForm.classList.remove("was-validated");
      } else {
        addPostForm.classList.add("was-validated");
      }
    });
  }

  // --- Edit Post Form Logic ---
  if (editPostForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const postTitle = decodeURIComponent(urlParams.get("title"));
    const postToEdit = customBlogPosts.find((post) => post.title === postTitle);
    const deleteButtonOnEditPage = document.getElementById("delete-post-btn");

    if (postToEdit) {
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
        const postIndex = customBlogPosts.findIndex(
          (post) => post.title === postTitle
        );

        if (postIndex !== -1) {
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
          messageDiv.style.color = "green";
          setTimeout(() => {
            messageDiv.textContent = "";
            window.location.href = "../../index.html";
          }, 2000);
        }
      });

      if (deleteButtonOnEditPage) {
        deleteButtonOnEditPage.addEventListener("click", () => {
          const confirmation = confirm(
            `Are you sure you want to delete the post "${postToEdit.title}"?`
          );
          if (confirmation) {
            const postIndex = customBlogPosts.findIndex(
              (p) => p.title === postToEdit.title
            );
            if (postIndex !== -1) {
              customBlogPosts.splice(postIndex, 1);
              localStorage.setItem(
                "customBlogPosts",
                JSON.stringify(customBlogPosts)
              );
              showCustomAlert("Post deleted successfully!", "error");
              setTimeout(() => {
                window.location.href = "../../index.html";
              }, 1500);
            }
          }
        });
      }
    }
  }

  // --- Single Post View Logic ---
  // This block handles the view.html page
  const postContainer = document.getElementById("blog-post-content");
  const actionButtons = document.getElementById("action-buttons");
  const editButton = document.getElementById("edit-post-btn");
  const loadingIndicator = document.getElementById("loading-indicator");

  if (postContainer && actionButtons && editButton && loadingIndicator) {
    const urlParams = new URLSearchParams(window.location.search);
    const postTitle = decodeURIComponent(urlParams.get("title"));
    const post = allBlogPosts.find((p) => p.title === postTitle);
    const isCustomPost = customBlogPosts.some((p) => p.title === postTitle);

    if (post) {
      postContainer.innerHTML = `
                ${
                  post.image
                    ? `<img src="${post.image}" alt="${post.title}" class="post-image">`
                    : ""
                }
                <h2 class="post-title">${post.title}</h2>
                <h3 class="post-category">${post.category}</h3>
                <div class="post-content">${post.content}</div>
            `;

      if (isCustomPost) {
        actionButtons.style.display = "flex";
      }

      editButton.href = `./edit.html?title=${encodeURIComponent(post.title)}`;

      // This delete button logic is a duplicate of the one on the edit page.
      // It should be handled by a single function to avoid redundancy.
      const deleteButtonOnViewPage = document.getElementById("delete-post-btn");
      if (deleteButtonOnViewPage) {
        deleteButtonOnViewPage.addEventListener("click", () => {
          const confirmation = confirm(
            `Are you sure you want to delete the post "${post.title}"?`
          );
          if (confirmation) {
            const postIndex = customBlogPosts.findIndex(
              (p) => p.title === post.title
            );
            if (postIndex !== -1) {
              customBlogPosts.splice(postIndex, 1);
              localStorage.setItem(
                "customBlogPosts",
                JSON.stringify(customBlogPosts)
              );
              showCustomAlert("Post deleted successfully!", "error");
              setTimeout(() => {
                window.location.href = "../../index.html";
              }, 1500);
            }
          }
        });
      }
    } else {
      postContainer.innerHTML = `<p>Blog post not found.</p>`;
    }
    loadingIndicator.style.display = "none";
  }

  // --- Contact Form Handler ---
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showCustomAlert(
        "Thank you for your message! I will get back to you shortly.",
        "success"
      );
      contactForm.reset();
    });
  }
});
