import React from 'react';

interface ArrowDownIconProps {
    color?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
}

const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({
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
        d="M21.6262 8.9162L13.9313 15.9162L6.23633 8.9162"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        />
        </svg>
    );
};

export default ArrowDownIcon;