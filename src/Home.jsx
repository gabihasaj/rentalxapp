import "./Home.css";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="hero">
        
      

      <div className="hero-content">
         </div>
         <section className="location-section">
        <div className="location-text">
          <h2>Trailer Pickup Location</h2>
          <p>50864 Otter Creek Dr, Shelby Township, MI 48317</p>
<div className="btns">
          <a
            className="maps-btn"
            href="https://maps.app.goo.gl/r2c6aauGF5bmAgET7"
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps
          </a>
          <a
  className="book-now-big-btn"

>
<Link to="/trailers">BOOK NOW</Link>

</a>
          </div>
        </div>
        

        <div className="map-container">
          <iframe
            title="RentalX Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5867.29641995202!2d-83.023184723835!3d42.66880971553976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824e76c85967141%3A0x73aae6c66c954541!2s50864%20Otter%20Creek%20Dr%2C%20Shelby%20Township%2C%20MI%2048317!5e0!3m2!1sen!2sus!4v1769480364469!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
      </section>
    </div>
    
  );
}

