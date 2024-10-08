document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("header");
  const elements = document.querySelectorAll(".hidden");
  const menuLinks = document.querySelectorAll(".mainmenu li a");
  const playButton = document.querySelector(".play-button");
  const videoContainer = document.querySelector(".video-container");
  const items = document.querySelectorAll(".accordion button");
  AOS.init({
    duration: 100,
    once: true,
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        } else {
          entry.target.classList.remove("fade-in");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
      menuLinks.forEach((link) => link.classList.add("scrolled"));
    } else {
      navbar.classList.remove("scrolled");
      menuLinks.forEach((link) => link.classList.remove("scrolled"));
    }
  });

  playButton.addEventListener("click", function (e) {
    e.preventDefault();
    videoContainer.style.display = "block";
    const iframe = document.getElementById("video");
    iframe.src += "&autoplay=1";
  });

  function toggleAccordion() {
    const itemToggle = this.getAttribute("aria-expanded");

    // Close all items
    items.forEach((item) => {
      item.setAttribute("aria-expanded", "false");
    });

    // If the item was closed, open it
    if (itemToggle === "false") {
      this.setAttribute("aria-expanded", "true");
    }
  }

  // Add click event listeners to all accordion buttons
  items.forEach((item) => item.addEventListener("click", toggleAccordion));

  $(".testi.owl-carousel").owlCarousel({
    items: 3,
    margin: 5,
    lazyLoad: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});
