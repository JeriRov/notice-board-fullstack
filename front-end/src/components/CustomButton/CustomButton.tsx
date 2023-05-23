import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react';

interface CustomButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  textSize?: TextSize;
}

export enum TextSize {
  BASE = 'text-base',
  SMALL = 'text-sm',
  MEDIUM = 'text-md',
  LARGE = 'text-lg',
}

export const CustomButton: FC<PropsWithChildren<CustomButtonProps>> = ({
  children,
  className,
  title,
  textSize = TextSize.BASE,
  ...props
}) => {
  return (
    <div className={className}>
      <div className="relative text-gray-600">
        <button
          className="py-5 w-full text-base pl-16 text-center focus:outline-none text-white bg-swipesell-slate-700 hover:bg-swipesell-slate-700/20 hover:text-swipesell-slate-700 rounded"
          {...props}>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            {children}
          </span>
          <span className={`pr-5 ${textSize}`}>{title}</span>
        </button>
      </div>
    </div>
  );
};
