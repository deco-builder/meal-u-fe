import React from 'react';

interface IconInputProps {
  title?: string;
  onInputHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  width?: string | number;
  onRightIconClick?: () => void;
  type?: string;  // Add this line
}

const IconInput: React.FC<IconInputProps> = ({ 
  title, 
  onInputHandleChange, 
  leftIcon,
  rightIcon,
  placeholder = '', 
  width = '100%',
  onRightIconClick,
  type = 'text'  // Add this line with default value
}) => {
  return (
    <div style={{ width: width }}>
      {title && <label style={{ display: 'block', marginBottom: '5px' }}>{title}</label>}
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <input
          type={type}  // Use the type prop here
          placeholder={placeholder}
          onChange={onInputHandleChange}
          style={{
            width: "100%",
            padding: "10px 10px 10px 40px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            outline: "none",
            backgroundColor: "#fff",
            paddingRight: rightIcon ? "40px" : "10px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          {leftIcon}
        </div>
        {rightIcon && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: onRightIconClick ? "pointer" : "default",
            }}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconInput;