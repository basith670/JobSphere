import "./FloatingCard.css";

const FloatingCard = ({ icon, title, value }) => {
  return (
    <div className="floating-card">
      <div className="floating-icon">
        {icon}
      </div>

      <div>
        <h4>{value}</h4>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default FloatingCard;