const Input = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
  }) => {
    return (
      <div className="profile-item">
  
        {label && (
          <label className="profile-label">
            {label}
          </label>
        )}
  
        <input
          className="input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
  
      </div>
    );
  };
  
  export default Input;