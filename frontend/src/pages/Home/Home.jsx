import Hero from "../../components/home/Hero";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import CompanyShowcase from "../../components/home/CompanyShowcase";
import HomeFeaturedJobs from "../../components/home/HomeFeaturedJobs";
import HomeStatistics from "../../components/home/HomeStatistics";
import HomeAIFeatures from "../../components/home/HomeAIFeatures";
import HomeHowItWorks from "../../components/home/HomeHowItWorks";
import HomeTestimonials from "../../components/home/HomeTestimonials";
import HomeCTA from "../../components/home/HomeCTA";
import HomeFooter from "../../components/home/HomeFooter";

const Home = () => {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <CompanyShowcase />
      <HomeFeaturedJobs />
      <HomeStatistics />
      <HomeAIFeatures />
      <HomeHowItWorks />
      <HomeTestimonials />
      <HomeCTA />
      <HomeFooter />
    </>
  );
};

export default Home;