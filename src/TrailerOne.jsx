import "./TrailerOne.css";
import { Link } from "react-router-dom";

// Put your images in src/assets/ and import them like this:
import pic1 from "/Trailer12.jpg";
import pic2 from "/Trailer11.jpg";
import pic3 from "/Trailer13.jpg";
import pic4 from "/Trailer14.jpg";
import pic5 from "/Trailer15.jpg";


export default function TrailerOne() {
  const images = [pic1, pic2, pic3, pic4, pic5];

  return (
    <main className="trailerone-page">
      {/* Swipeable gallery */}
      <section className="trailerone-gallery" aria-label="Trailer photos">
        {images.map((src, i) => (
          <figure className="trailerone-slide" key={i}>
            <img
              className="trailerone-img"
              src={src}
              alt={`Trailer photo ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </figure>
        ))}
      </section>

      {/* Content */}
      <section className="trailerone-content">
        <h1 className="trailerone-title">Enclosed 20ft wt 2ft vnose trailer</h1>

        <p className="trailerone-desc">
        Haul your car, toys, or equipment with ease!
This Blackout Edition Discovery Trailer is tough, clean, and ready to go.
        </p>

        <ul className="trailerone-details">
        <li><strong>10,000 lb capacity</strong> (3,400 lb empty weight)</li>
  <li><strong>5,200 lb Dexter axles</strong> with electric brakes</li>
  <li>Beavertail rear ramp with extensions</li>
  <li>Bright LED lights inside and out</li>
  <li>48” side door, Drymax floor and walls</li>
  <li>2 5/16” hitch</li>
  <li>Includes towing straps and wheel chocks</li>
  <li>No mileage limit. No area restriction.</li>

        </ul>
        



      </section>
      <div className="trailerone-pricing">
<strong>$70 / day</strong> &nbsp;·&nbsp; <strong>$490 / week</strong>
</div>
      {/* Bottom button */}
      <footer className="trailerone-footer">
      <Link to="/book/enclosed"><button>Book Enclosed</button></Link>
      </footer>
    </main>
  );
}
