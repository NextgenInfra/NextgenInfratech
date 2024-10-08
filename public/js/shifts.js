const images = [
  {
    src: "./public/images/zoopie.jpeg",
    title: "Night",
    count: "100000",
  },
  {
    src: "./public/images/zoopie.jpeg",
    title: "Day",
    count: "50000",
  },
];

let currentIndex = 0;

function updateContent() {
  const imageElement = document.getElementById("shift-image");
  const titleElement = document.getElementById("shift-title");
  const countElement = document.getElementById("shift-count");

  imageElement.style.opacity = 0; // Fade out

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length; // Cycle through images
    imageElement.src = images[currentIndex].src;
    titleElement.textContent = images[currentIndex].title;
    countElement.textContent = images[currentIndex].count;

    imageElement.style.opacity = 1; // Fade in
  }, 1000); // Match with CSS transition duration
}

// Initial load
updateContent();

// Change every 5 seconds
setInterval(updateContent, 5000);
