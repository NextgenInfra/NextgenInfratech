document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quick_form");

  form.addEventListener("submit", function (event) {
    let valid = true;

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());

    // Validate the select dropdown
    const selectPlan = document.getElementById("select_plan");
    if (!selectPlan.value) {
      valid = false;
      showError(selectPlan, "Please select an option.");
    }

    // Validate email
    const email = document.getElementById("work_email");
    if (!validateEmail(email.value)) {
      valid = false;
      showError(email, "Please enter a valid email.");
    }

    // Validate mobile phone
    const mobilePhone = document.getElementById("mobile_phone");
    if (!mobilePhone.value) {
      valid = false;
      showError(mobilePhone, "Mobile phone is required.");
    }

    // Validate full name
    const fullName = document.getElementById("full_name");
    if (!fullName.value) {
      valid = false;
      showError(fullName, "Full name is required.");
    }

    // Validate move-in date
    const moveInDate = document.getElementById("move_in_date");
    if (!moveInDate.value) {
      valid = false;
      showError(moveInDate, "Move-in date is required.");
    }

    // Validate number of people
    const numberOfPeople = document.getElementById("number_of_people");
    if (!numberOfPeople.value) {
      valid = false;
      showError(numberOfPeople, "Number of people is required.");
    }

    // Validate company name
    const company = document.getElementById("company");
    if (!company.value) {
      valid = false;
      showError(company, "Company name is required.");
    }

    // If not valid, prevent form submission
    if (!valid) {
      event.preventDefault();
    }
  });

  function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.textContent = message;
    input.parentElement.insertBefore(error, input.nextSibling);
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
