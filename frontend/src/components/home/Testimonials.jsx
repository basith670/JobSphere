import "./Testimonials.css";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Google",
    review:
      "JobSphere's AI recommendations helped me discover opportunities that perfectly matched my skills. The application process was incredibly smooth.",
  },
  {
    name: "Priya Nair",
    role: "HR Manager",
    company: "Microsoft",
    review:
      "Managing recruitment through JobSphere has reduced our hiring time significantly. The candidate matching is surprisingly accurate.",
  },
  {
    name: "Arjun Menon",
    role: "Full Stack Developer",
    company: "Amazon",
    review:
      "The resume review and interview preparation features gave me much more confidence before applying for jobs.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">

      <div className="testimonial-container">

        <div className="testimonial-header">

          <span>Success Stories</span>

          <h2>Trusted by Candidates & Recruiters</h2>

          <p>
            Thousands of professionals use JobSphere to grow their careers and
            build successful teams.
          </p>

        </div>

        <div className="testimonial-grid">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="testimonial-card"
            >

              <Quote className="quote-icon" size={30} />

              <p>{item.review}</p>

              <div className="testimonial-user">

                <div className="avatar">
                  {item.name.charAt(0)}
                </div>

                <div>

                  <h4>{item.name}</h4>

                  <span>
                    {item.role} • {item.company}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;