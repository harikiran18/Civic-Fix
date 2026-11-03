import "./Features.css";

function Features() {
  return (
    <section className="features">

      <h2>Why Choose CivicFix?</h2>

      <div className="feature-grid">

        <div className="feature-card">
          <h3>📍 Live Location</h3>
          <p>Automatically captures your location while reporting issues.</p>
        </div>

        <div className="feature-card">
          <h3>📸 Image Upload</h3>
          <p>Upload photos as proof to help authorities understand the problem.</p>
        </div>

        <div className="feature-card">
          <h3>🔔 Real-Time Status</h3>
          <p>Track every complaint from submission to resolution.</p>
        </div>

        <div className="feature-card">
          <h3>📊 Analytics</h3>
          <p>View statistics and trends of reported civic issues.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;