const Textarea = ({
    label,
    name,
    value,
    onChange,
    rows = 5,
  }) => {
    return (
      <div className="profile-item">
  
        {label && (
          <label className="profile-label">
            {label}
          </label>
        )}
  
        <textarea
          className="input"
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
        />
  
      </div>
    );
  };
  
  export default Textarea;