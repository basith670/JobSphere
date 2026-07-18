import "./HomeFeaturedJobs.css";

import { useEffect, useState } from "react";

import { getFeaturedJobs } from "../../services/jobService";

import HomeFeaturedJobCard from "./HomeFeaturedJobCard";

export default function HomeFeaturedJobs() {

  const [jobs, setJobs] =useState([]);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{

      loadJobs();

  },[]);

  const loadJobs=async()=>{

      try{

          const data=await getFeaturedJobs();

          setJobs(data.results || data);

      }

      catch(err){

          console.error(err);

      }

      finally{

          setLoading(false);

      }

  };

  return(

      <section className="home-featured-section">

          <div className="home-featured-container">

              <span className="home-featured-tag">

                  Featured Jobs

              </span>

              <h2 className="home-featured-heading">

                  Discover Your Next Opportunity

              </h2>

              <p className="home-featured-description">

                  Hand-picked opportunities from leading companies hiring now.

              </p>

              {loading ? (

                  <h3>Loading...</h3>

              ) : (

                  <div className="home-featured-grid">

                      {jobs.map((job)=>(

                          <HomeFeaturedJobCard

                              key={job.id}

                              job={job}

                          />

                      ))}

                  </div>

              )}

          </div>

      </section>

  );

}