import React from "react";

// Extend the Props interface to include an optional id
interface Props {
    children: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'success'; // Corrected typo from 'secoundary' to 'secondary'
    id?: string; // Added id as an optional prop
}

const Button = ({ children, onClick, color = "primary", id }: Props) => {
  return (
    <button 
        type="button" 
        className={'btn btn-' + color}
        onClick={onClick}
        id={id} // Use the id prop to set the button's id attribute
    >
        {children}
    </button>
  );
}

export default Button;
