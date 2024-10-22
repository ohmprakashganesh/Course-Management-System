import React from "react"
import Back from "../common/back/Back"
import "./contact.css"

const Contact = () => {
  function validateAndSend(event) {
    event.preventDefault(); // Prevent the form from submitting automatically

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Name field
    if (name.trim() === "") {
      alert("Name is required");
      return false;
    }

    // Validate Email field
    if (email.trim() === "") {
      alert("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return false;
      
    }

    // Validate Subject field
    if (subject.trim() === "") {
      alert("Subject is required");
      return false;
    }

    // Validate Message field
    if (message.trim() === "") {
      alert("Message is required");
      return false;
    }

    // Send form data to the backend using fetch API
    const formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    fetch("http://localhost:8080/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send email.");
      });

    return true; // Allow the form submission if validation passes
  }

  const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ';
  return (
    <>
      <Back title='Contact us' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map}></iframe>
          </div>
          <div className='right row'>
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className='items grid2'>
              <div className='box'>
                <h4>ADDRESS:</h4>
                <p>198 West 21th Street, barhadashi 2 Jhapa NY 5005</p>
              </div>
              <div className='box'>
                <h4>EMAIL:</h4>
                <p> LearningManage@gmai.com</p>
              </div>
              <div className='box'>
                <h4>PHONE:</h4>
                <p> + 9817063088</p>
              </div>
            </div>


            <form action='' onSubmit="validateAndSend">
  <div class='flexSB'>
    <input type='text' id="name" placeholder='Name' />
    <input type='email' id="email" placeholder='Email' />
  </div>
  <input type='text' id="subject" placeholder='Subject' />
  <textarea id="message" cols='30' rows='10' placeholder="Create a message here..."></textarea>
  <button type="submit" class='primary-btn'>SEND MESSAGE</button>
</form>

            <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
