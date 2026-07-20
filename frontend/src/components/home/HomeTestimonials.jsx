import "./HomeTestimonials.css";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Google",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "JobSphere's AI Resume Analyzer helped me improve my resume and I received interview calls within a week.",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Frontend Developer",
    company: "Microsoft",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The AI Mock Interview feature boosted my confidence and prepared me for technical interviews.",
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "HR Manager",
    company: "Infosys",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Recruitment became much faster. We shortlisted qualified candidates in a fraction of the usual time.",
  },
];

export default function HomeTestimonials() {
  return (
<section className="home-testimonial-section section">
  <div className="container">
    <div className="home-testimonial-container">

        <span className="home-testimonial-tag">
          Success Stories
        </span>

        <h2 className="home-testimonial-heading">
          Trusted by Candidates & Recruiters
        </h2>

        <p className="home-testimonial-description">
          Thousands of professionals have accelerated their careers using JobSphere.
        </p>

        <div className="home-testimonial-grid">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="home-testimonial-card"
            >

              <div className="home-testimonial-stars">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="home-testimonial-review">
                "{item.review}"
              </p>

              <div className="home-testimonial-user">

                <img
                  src={item.image}
                  alt={item.name}
                  className="home-testimonial-image"
                />

                <div>

                  <h3>{item.name}</h3>

                  <span>
                    {item.role} • {item.company}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

        </div>
      </div>
    </section>
  );
}