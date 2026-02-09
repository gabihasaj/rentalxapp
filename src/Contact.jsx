import { useEffect } from "react";

import "./Contact.css";

export default function Contact() {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1 className="contact-title">Contact RentalX</h1>
        <p className="contact-subtitle">Reach out to us anytime!</p>

        <div className="contact-actions">
          <a className="contact-pill contact-pill--phone" href="tel:2487590222">
            <span className="contact-icon" aria-hidden="true">
              {/* phone icon */}
              <svg viewBox="0 0 24 24" className="icon">
                <path
                  d="M6.6 10.8c1.5 3 3.6 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2 .6 3.1.6.7 0 1.3.6 1.3 1.3V21c0 .7-.6 1.3-1.3 1.3C10.1 22.3 1.7 13.9 1.7 3.7 1.7 3 2.3 2.4 3 2.4h3.5c.7 0 1.3.6 1.3 1.3 0 1.1.2 2.1.6 3.1.1.4 0 .9-.3 1.2l-2.5 2.8z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="contact-pill-text">(248) 759-0222</span>
          </a>

          <a
            className="contact-pill contact-pill--email"
            href="mailto:rentalxtrailers@gmail.com"
          >
            <span className="contact-icon" aria-hidden="true">
              {/* mail icon */}
              <svg viewBox="0 0 24 24" className="icon">
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="contact-pill-text">rentalxtrailers@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
