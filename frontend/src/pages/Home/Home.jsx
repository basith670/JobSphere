import Hero from "../../components/home/Hero";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import FeaturedJobs from "../../components/jobs/FeaturedJobs";
import CompanySection from "../../components/companies/CompanySection";

const Home = () => {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <FeaturedJobs/>
      <CompanySection />
      <FeaturedJobs />

    </>
  );
};

export default Home;