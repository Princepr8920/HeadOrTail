import React from "react";
import "./contact.scss";

export default function Contact() {
  return (
    <>
      <section id="contact">
        <div id="contact_div">
          <div id="contact_header">
            <h1>Contact</h1>
          </div>

          <div id="contact_items">
            <div id="client_info">
              <form>
                {" "}
                <label htmlFor="name">
                  Name<span>*</span>
                </label>
                <input placeholder="Name" id="name" type="text" required/>
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
                <input placeholder="Email" id="" type="email" required/>
                <label htmlFor="subject">
                  Subject<span>*</span>
                </label>
                <input placeholder="Subject" id="subject" type="text" required/>
                <label htmlFor="message">
                  Message<span>*</span>
                </label>
                <textarea
                  placeholder="type your message here.."
                  name="message"
                  id="message"
                  rows="8"
                  required
                ></textarea>
                <input id="send" type="submit" value="Send" />
              </form>
            </div>
            <div id="my_info">
              <div id="contact_us">
                <h2>Contact me</h2>
              </div>
              <div id="my_address">
                <address>
                  <div id="myPhone">
                    <h3><i className="fas fa-mobile-alt"></i>Phone</h3>
                    <a href="tel:+917027628920">+917027628920</a>
                  </div>
                  <div id="myEmail">
                    <h3><i className="fas fa-envelope-square"></i>Email</h3>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=PrincePr920@outlook.com">
                     PrincePr920@outlook.com
                    </a>
                  </div>
                </address>
                <div id="social">
                  <a href="https://github.com/Princepr8920">
                    <i className="fa-brands fa-github"></i>Github
                  </a>
                  <a href="https://www.linkedin.com/in/prince-saini-056582201/">
                    <i className="fa-brands fa-linkedin"></i>Linkedin
                  </a>
                </div>
              </div>
              <img id="conversation" src="https://lukaszadam.com/conversation_illustration.svg" alt="conversation_svg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
