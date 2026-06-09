import type React from "react"

interface ButtonProps  extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
    isLoading?:boolean
   
}
export const Button : React.FC<ButtonProps> = ({isLoading,disabled, className='', ...props}) => {
    return (
    <button
      disabled={disabled || isLoading}
      className={`
      bg-lime-800 flex  hover:bg-lime-400 rounded-xl  justify-center items-center
        ${className}
      `}
      {...props}
    >
    </button>
  );
}