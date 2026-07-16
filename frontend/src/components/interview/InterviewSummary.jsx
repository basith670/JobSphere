import {
    FaList,
    FaLaptopCode,
    FaUserTie,
    FaCode,
  } from "react-icons/fa";
  
  export default function InterviewSummary({ questions }) {
  
    const total =
      questions.technical_questions.length +
      questions.coding_questions.length +
      questions.behavioral_questions.length +
      questions.hr_questions.length;
  
    const cards = [
  
      {
        title: "Total Questions",
        value: total,
        icon: <FaList />,
      },
  
      {
        title: "Technical",
        value: questions.technical_questions.length,
        icon: <FaLaptopCode />,
      },
  
      {
        title: "Coding",
        value: questions.coding_questions.length,
        icon: <FaCode />,
      },
  
      {
        title: "HR",
        value: questions.hr_questions.length,
        icon: <FaUserTie />,
      },
  
    ];
  
    return (
  
      <div className="interview-summary">
  
        {
  
          cards.map(card => (
  
            <div
              key={card.title}
              className="interview-summary-card"
            >
  
              <div className="summary-top">
  
                {card.icon}
  
              </div>
  
              <h2>{card.value}</h2>
  
              <p>{card.title}</p>
  
            </div>
  
          ))
  
        }
  
      </div>
  
    );
  
  }