import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how">

      <h2>How CivicFix Works</h2>

      <div className="cards">

        <div className="card">
          <div className="icon">📷</div>
          <h3>Capture</h3>
          <p>Take a photo of the issue.</p>
        </div>

        <div className="card">
          <div className="icon">📍</div>
          <h3>Report</h3>
          <p>Submit with your location.</p>
        </div>

        <div className="card">
          <div className="icon">✅</div>
          <h3>Track</h3>
          <p>Follow complaint status.</p>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;