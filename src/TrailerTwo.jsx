import "./TrailerOne.css";
import { Link } from "react-router-dom";

// Put your images in src/assets/ and import them like this:
import pic1 from "/Trailer21.jpeg";
import pic2 from "/Trailer22.jpeg";
import pic3 from "/Trailer23.jpeg";
import pic4 from "/Trailer24.jpeg";
import pic5 from "/Trailer25.jpeg";


export default function TrailerTwo() {
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
        <h1 className="trailerone-title">Open Trailer</h1>

        <p className="trailerone-desc">
        Available for rent: a 2026 7×20 open car hauler trailer. This is a clean, newer model that is well-maintained and ready for use. Ideal for transporting vehicles, ATVs, side-by-sides, and various types of equipment.
        </p>

        <ul className="trailerone-details">
        <li><strong>7×20 open trailer</strong></li>
<li><strong>Dual 3,500 lb axles</strong> (7,000 lb GVWR)</li>
<li>Electric trailer brakes</li>
<li><strong>10,000 lb front-mounted winch</strong></li>
<li>Steel loading ramps</li>
<li>Driver-side removable fender</li>
<li>Wheel tie-down straps storage compartment</li>
<li>Heavy-duty frame</li>


        </ul>
        



      </section>
      <div className="trailerone-pricing">
 <strong>$60 / day</strong> &nbsp;·&nbsp; <strong>$490 / week</strong>
</div>
      {/* Bottom button */}
      <footer className="trailerone-footer">
      <Link to="/book/open"><button>Book Now</button></Link>
      </footer>
    </main>
  );
}
