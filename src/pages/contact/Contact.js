import React, { useState } from "react";
import Card from "../../components/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { useRef } from "react";
import emailjs from "@emailjs/browser"

const Contact = () => {
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('service_ikievnv','template_qyvl2o1', form.current, 'MnfvrzJ3Q_9PBDppM')
      .then((result) => {
        console.log(result.text);
      },(error) => {
        console.log(error.text);
      })
      e.target.reset()
  }


  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form 
          ref={form}
          onSubmit={sendEmail}
        >
          <Card cardClass="card">
            <input
                type="text"
                placeholder="Full Name"
                required
                name="user_name"
            />
            <input
                type="text"
                placeholder="Subject"
                required
                name="subject"
            />
            <textarea
                placeholder="Message"
                cols="30"
                rows="10"
                required
                name="message"
            />

            <input
                type="email"
                placeholder="Email"
                required
                name="user_email"
            />
            <button type="submit" className="--btn --btn-primary">Send Message</button>
          </Card>
        </form>

        <div className="details">

            <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>

              <div className="icons">
                <span>
                  <FaPhoneAlt />
                  <p>+853 66369509</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>carreyusermanagement@outlook.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>China, Macau</p>
                </span>
                {/* <span>
                  <FaTwitter />
                  <p>@ZinoTrust</p>
                </span> */}
              </div>
            </Card>


        </div>
      </div>
    </div>
  );
};

export default Contact;