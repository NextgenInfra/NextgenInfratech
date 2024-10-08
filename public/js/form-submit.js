$(document).ready(function () {
  $("#quick_form").on("submit", function (event) {
    event.preventDefault();

    // Clear previous messages
    $("#msgSubmit").addClass("hidden").text("");

    // Gather input fields and validate
    let isValid = true; // Flag to track validation
    $(this)
      .find("input, select")
      .each(function () {
        if ($(this).val().trim() === "") {
          isValid = false; // Set flag to false if any field is empty
          $(this).addClass("input-error"); // Optionally highlight the empty field
        } else {
          $(this).removeClass("input-error"); // Remove error highlight if filled
        }
      });

    if (!isValid) {
      $("#msgSubmit")
        .removeClass("hidden")
        .text("Please fill in all fields.")
        .css("color", "red");
      return; // Stop submission if validation fails
    }

    const submitButton = $(this).find('button[type="submit"]');
    const originalButtonText = submitButton.text(); // Store the original text
    submitButton.prop("disabled", true).text("Submitting..."); // Disable the button and change text

    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      data: $(this).serialize(), // Serialize form data
      success: function (response) {
        $("#msgSubmit")
          .removeClass("hidden")
          .text(response)
          .css("color", "green");
        $("#quick_form")[0].reset(); // Optionally reset the form
      },
      error: function () {
        $("#msgSubmit")
          .removeClass("hidden")
          .text("An error occurred. Please try again.")
          .css("color", "red");
      },
      complete: function () {
        submitButton.prop("disabled", false).text(originalButtonText); // Restore original text and enable button
      },
    });
  });
});
