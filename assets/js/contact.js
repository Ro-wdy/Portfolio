// Contact form functionality with EmailJS
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your public key
  emailjs.init("");

  const contactForm = document.getElementById("contact-form");
  const formMessage = document.querySelector(".sent-message");
  const errorMessage = document.querySelector(".error-message");
  const loading = document.querySelector(".loading");
  const submitBtn = contactForm.querySelector(".btn");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    loading.style.display = "block";
    errorMessage.style.display = "none";
    formMessage.style.display = "none";
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      to_email: "preffered email here",
    };

    // Send the email
    emailjs
      .send("service_ID", "template_ID", templateParams)
      .then(() => {
        console.log("SUCCESS! Message sent.");
        loading.style.display = "none";
        formMessage.style.display = "block";
        submitBtn.disabled = false;
        contactForm.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error);
        loading.style.display = "none";
        submitBtn.disabled = false;
        errorMessage.innerHTML =
          "An error occurred while sending your message. Please try again later.";
        errorMessage.style.display = "block";
      });
  });
});
