import "./FloatingCard.css";

const FloatingCard = ({
  icon,
  title,
  value,
  className = "",
}) => {
  return (
    <div className={`floating-card ${className}`}>
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