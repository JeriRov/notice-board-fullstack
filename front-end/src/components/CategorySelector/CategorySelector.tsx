import React, { ChangeEventHandler, FC, HTMLAttributes } from 'react';

import { FaAngleDown } from 'react-icons/fa';

import { CategoriesWithIcons } from '../../constants/categories';
import { CategoriesParams } from '../../services/notices/noticesApi';

export interface CategorySelectorProps
  extends HTMLAttributes<HTMLSelectElement> {
  categories?: CategoriesWithIcons[] | CategoriesParams[];
  classContainer?: string;
  selectedCategory: string;
  value?: string;
  required?: boolean;
  name?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const CategorySelector: FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onChange: handleCategoryChange,
  className,
  classContainer,
  required = false,
  name,
}) => {
  return (
    <div className={`relative inline-block justify-center ${classContainer}`}>
      <select
        className={`block appearance-none w-full bg-white text-gray-700 py-5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ${className}`}
        name={name}
        onChange={handleCategoryChange}
        required={required}
        value={selectedCategory}>
        <option value={''}>Оберіть категорію</option>
        {categories?.map(category => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaAngleDown className="fill-current" size={22} />
      </div>
    </div>
  );
};
