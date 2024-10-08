document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".space-cards");

  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing after it's visible
      }
    });
  }, options);

  cards.forEach((card) => {
    observer.observe(card);
  });
});
