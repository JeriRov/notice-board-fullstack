import React, { forwardRef, InputHTMLAttributes } from 'react';

export type CustomTextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const CustomTextInput = forwardRef<
  HTMLInputElement,
  CustomTextInputProps
>(({ children, title, className, type, ...props }, ref) => {
  return (
    <div className={className}>
      {title}
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          {children}
        </span>
        <input
          ref={ref}
          {...props}
          autoComplete="off"
          className="py-5 w-full text-base text-swipesell-slate-400 bg-white pl-16 focus:outline-none focus:text-swipesell-slate-800 rounded"
          type={!type ? 'text' : type}
        />
      </div>
    </div>
  );
});
