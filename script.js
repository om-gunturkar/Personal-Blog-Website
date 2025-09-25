
document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // Image Preview (Add Post Page)
  // -------------------------
  const postImageInput = document.getElementById("post-image");
  const preview = document.getElementById("image-preview");

  if (postImageInput && preview) {
    postImageInput.addEventListener("input", function () {
      const url = this.value.trim();
      if (url) {
        preview.src = url;
        preview.style.display = "block";
      } else {
        preview.src = "";
        preview.style.display = "none";
      }
    });
  }

  // -------------------------
  // Add Post Form Logic
  // -------------------------
  const addPostForm = document.getElementById("add-post-form");
  let imageBase64=null;
  if (addPostForm) {
    addPostForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (addPostForm.checkValidity()) {
        const newPost = {
          title: document.getElementById("post-title").value,
          excerpt: document.getElementById("post-subject").value,
          category: document.getElementById("post-category").value,
          
          image: imageBase64 || "assets/om1234.jpg", // fallback
          content: document.getElementById("post-description").value,
        };

        // Save to localStorage
        let customBlogPosts =
          JSON.parse(localStorage.getItem("customBlogPosts")) || [];
        customBlogPosts.unshift(newPost);
        localStorage.setItem(
          "customBlogPosts",
          JSON.stringify(customBlogPosts)
        );

        const messageDiv = document.getElementById("message");
        messageDiv.textContent = "Post published successfully!";
        messageDiv.style.color = "green";

        setTimeout(() => {
          window.location.href = "../../index.html";
        }, 2000);

        addPostForm.reset();
      } else {
        addPostForm.classList.add("was-validated");
      }
    });
  }
});

const defaultBlogPosts = []; // or your default blog array

let customBlogPosts = JSON.parse(localStorage.getItem("customBlogPosts")) || [];
let allBlogPosts = [...customBlogPosts];

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
          <a href="./components/blogs/edit.html?title=${encodedTitle}">Edit Blog →</a>
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
      filteredPosts = allBlogPosts.filter((post) => post.category === category);
      if (viewAllLink) viewAllLink.style.display = "none";
      if (viewLessLink) viewLessLink.style.display = "none";
    }
    renderPosts(filteredPosts);
  });
});

// --- Add Post Form Logic ---
if (addPostForm) {
  const fileInput = document.getElementById("post-image-file");
  let imageBase64 = "";

  // Convert file to Base64 when selected
  fileInput.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = function(e) {
      imageBase64 = e.target.result; // store Base64 image string
    };
    if (fileInput.files[0]) {
      reader.readAsDataURL(fileInput.files[0]);
    }
  });

  addPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const publishButton = addPostForm.querySelector('button[type="submit"]');
    if (publishButton) {
      publishButton.textContent = "Processing...";
      publishButton.disabled = true;
    }

    setTimeout(() => {
      if (publishButton) {
        publishButton.textContent = "Publish Post";
        publishButton.disabled = false;
      }

      if (addPostForm.checkValidity()) {
        const newPost = {
          title: document.getElementById("post-title").value,
          excerpt: document.getElementById("post-subject").value,
          category: document.getElementById("post-category").value,
          image: imageBase64 || "assets/om1234.jpg",
          content: document.getElementById("post-description").value,
        };

        let customBlogPosts =
          JSON.parse(localStorage.getItem("customBlogPosts")) || [];
        customBlogPosts.unshift(newPost);
        localStorage.setItem(
          "customBlogPosts",
          JSON.stringify(customBlogPosts)
        );

        const messageDiv = document.getElementById("message");
        messageDiv.textContent = "Post published successfully!";
        messageDiv.style.color = "green";
        messageDiv.classList.add("success");

        setTimeout(() => {
          window.location.href = "../../index.html";
        }, 2000);

        addPostForm.reset();
        addPostForm.classList.remove("was-validated");
      } else {
        addPostForm.classList.add("was-validated");

        const messageDiv = document.getElementById("message");
        messageDiv.textContent = "";
        messageDiv.classList.remove("success", "error");
      }
    }, 4000);
  });
}

// --- Edit Post Form Logic ---
if (editPostForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const postTitle = decodeURIComponent(urlParams.get("title"));
  const postToEdit = customBlogPosts.find((post) => post.title === postTitle);
  const deleteButtonOnEditPage = document.getElementById("delete-post-btn");

  const imageInputFile = document.getElementById("post-image-file");
  const imagePreview = document.getElementById("image-preview");
  const removeFileImageBtn = document.getElementById("remove-file-image-btn");

  let imageBase64FromFile = "";

  if (postToEdit) {
    document.getElementById("post-title").value = postToEdit.title;
    document.getElementById("post-subject").value = postToEdit.excerpt;
    document.getElementById("post-category").value = postToEdit.category;

    if (postToEdit.image && postToEdit.image !== "assets/om1234.jpg") {
      imagePreview.src = postToEdit.image;
      imagePreview.style.display = "block";
      if (postToEdit.image.startsWith("data:image/")) {
        imageBase64FromFile = postToEdit.image;
        if (removeFileImageBtn)
          removeFileImageBtn.style.display = "inline-block";
      }
    } else {
      imagePreview.style.display = "none";
      if (removeFileImageBtn) removeFileImageBtn.style.display = "none";
    }

    imageInputFile.addEventListener("change", () => {
      const file = imageInputFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageBase64FromFile = e.target.result;
          imagePreview.src = imageBase64FromFile;
          imagePreview.style.display = "block";
          if (removeFileImageBtn)
            removeFileImageBtn.style.display = "inline-block";
        };
        reader.readAsDataURL(file);
      } else {
        imageBase64FromFile = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
        if (removeFileImageBtn) removeFileImageBtn.style.display = "none";
      }
    });

    if (removeFileImageBtn) {
      removeFileImageBtn.addEventListener("click", () => {
        imageInputFile.value = "";
        imageBase64FromFile = "";
        imagePreview.src = "";
        imagePreview.style.display = "none";
        removeFileImageBtn.style.display = "none";
      });
    }

    document.getElementById("post-description").value = postToEdit.content;

    editPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const postIndex = customBlogPosts.findIndex(
        (post) => post.title === postTitle
      );

      let finalImageSource = imageBase64FromFile || "assets/om1234.jpg";

      if (postIndex !== -1) {
        customBlogPosts[postIndex] = {
          title: document.getElementById("post-title").value,
          excerpt: document.getElementById("post-subject").value,
          category: document.getElementById("post-category").value,
          image: finalImageSource,
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

// --- Contact Form Handler ---
function showCustomAlert(message, type) {
  const existingMessageDiv = document.querySelector(".form-message");
  let messageDiv;

  if (existingMessageDiv) {
    messageDiv = existingMessageDiv;
    messageDiv.style.cssText = "";
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = "block";
    messageDiv.style.color = type === "success" ? "#28a745" : "#dc3545";
    messageDiv.style.fontWeight = "bold";
  } else {
    messageDiv = document.createElement("div");
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
  }

  setTimeout(() => {
    if (existingMessageDiv) {
      messageDiv.textContent = "";
      messageDiv.className = "form-message";
      messageDiv.style.display = "none";
    } else {
      messageDiv.remove();
    }
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
      }

      showCustomAlert(
        "Thank you for your message! I will get back to you shortly.",
        "success"
      );

      contactForm.reset();
      contactForm.classList.remove("was-validated");
    });
  }
});
