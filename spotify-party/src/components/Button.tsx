import React from "react";

interface Props {
    children: string;
    onClick: () => void;
    color?: 'primary' | 'secoundary' | 'success';
}

const Button = ({children, onClick, color ="primary"}: Props) => {
  return (
    <button 
        type="button" 
        className={'btn btn-' + color}
        onClick={onClick}
    >
            {children}
    </button>
    
  )
}

export default Button
