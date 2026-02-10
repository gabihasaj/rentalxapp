import { Link } from "react-router-dom";
import "./Trailers.css";

export default function Trailers() {
  return (
    <div className="trailers-page">
      <div className="trailers-hero">
        <h1 className="trailers-title">Choose Your Trailer</h1>
        <p className="trailers-subtitle">Tap a trailer to view details and book.</p>
      </div>

      <div className="trailers-grid">
        <Link to="/trailerone" className="trailer-card">
        <img
  src={`${import.meta.env.BASE_URL}Trailer1.jpg`}
  alt="Closed Trailer"
  className="trailer-img"
  loading="lazy"
/>
          <div className="trailer-overlay" />
          <div className="trailer-text">
            <div className="trailer-name">Enclosed Trailer</div>
            <div className="trailer-hint">Tap to view details and book</div>
          </div>
        </Link>

       <Link to="/trailertwo" className="trailer-card">
       <img
  src={`${import.meta.env.BASE_URL}Trailer21.jpeg`}
  alt="Trailer 2"
  className="trailer-img"
  loading="lazy"
/>
          <div className="trailer-overlay" />
          <div className="trailer-text">
            <div className="trailer-name">Open Trailer</div>
            <div className="trailer-hint">Tap to view details and book</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
