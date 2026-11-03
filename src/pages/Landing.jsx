import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Features from "../components/Features/Features";
import Categories from "../components/Categories/Categories";
import Statistics from "../components/Statistics/Statistics";
import Footer from "../components/Footer/Footer";
import WhyChoose from "../components/WhyChoose/WhyChoose";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Categories />
      <Statistics />
      <WhyChoose />
      <Footer />
    </>
  );
}

export default Landing;