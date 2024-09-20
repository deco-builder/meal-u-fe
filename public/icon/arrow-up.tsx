import React from 'react';

interface ArrowUpIconProps {
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
}

const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
  color = "#042628",
}) => {
  return (
    <svg
    width="28"
    height="25"
    viewBox="0 0 28 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
      <path
      d="M21.6255 15.8274L13.9305 8.82739L6.2356 15.8274"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowUpIcon;