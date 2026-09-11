import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-info">
          <span className="section-subtitle">GET IN TOUCH</span>

          <h2>Contact IKOR Paradise</h2>

          <p>
            Have a question, want to book a room, or planning an event?
            Get in touch with our team.
          </p>

          <div className="contact-details">

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Our Location</h3>
                <p>
                  Near HP Petrol Pump, Khair Bypass,
                  Near Nada Chauraha, Aligarh
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Call Us</h3>
                <a href="tel:+918859012000">
                  +91-8859012000
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h3>Email Us</h3>
                <a href="mailto:ikorparadise@gmail.com">
                  ikorparadise@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="contact-form-box">
          <h3>Send an Enquiry</h3>

          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>

              <h4>Thank You!</h4>

              <p>
                Your enquiry has been submitted successfully.
                Our team will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="5"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Enquiry
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}

export default Contact;