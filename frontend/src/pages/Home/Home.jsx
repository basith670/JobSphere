import Hero from "../../components/home/Hero";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import FeaturedJobs from "../../components/jobs/FeaturedJobs";
import CompanySection from "../../components/companies/CompanySection";
import Statistics from "../../components/home/Statistics";
import AIFeatures from "../../components/home/AIFeatures";
import HowItWorks from "../../components/home/HowItWorks";
import Testimonials from "../../components/home/Testimonials";
import CTA from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <CompanySection />
      <FeaturedJobs />
      <Statistics />
      <AIFeatures />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />


    </>
  );
};

export default Home;