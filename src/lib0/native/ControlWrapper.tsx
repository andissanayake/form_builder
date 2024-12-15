import React from "react";

type ControlWrapperProps = {
  label?: string;
  children: React.ReactNode;
  error?: string;
  wrapperStyles?: React.CSSProperties;
};

const ControlWrapper: React.FC<ControlWrapperProps> = ({
  label,
  children,
  error,
  wrapperStyles,
}) => {
  return (
    <div style={wrapperStyles}>
      <label
        style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        {label && <span>{label}</span>}
      </label>
      <div style={{ marginBottom: "0.5rem" }}>{children}</div>
      <div style={{ color: "red" }}>{error && <span>{error}</span>}</div>
    </div>
  );
};

export default ControlWrapper;
