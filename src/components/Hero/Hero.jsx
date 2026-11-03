import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <h1>
          Making Cities Better,
          <br />
          One Report at a Time.
        </h1>

        <p>
          Report potholes, garbage, broken streetlights,
          water leaks and other civic issues in seconds.
        </p>

        <div className="buttons">

          <button className="report">
            Report Issue
          </button>

          <button className="learn">
            Learn More
          </button>

        </div>

      </div>

      <div className="hero-right">

        🚧

      </div>

    </section>
  );
}

export default Hero;