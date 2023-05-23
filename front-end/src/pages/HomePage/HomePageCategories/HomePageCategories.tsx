import React, { FC } from 'react';

import { AppLoader } from '../../../components/AppLoader/AppLoader';
import {
  CustomButton,
  TextSize,
} from '../../../components/CustomButton/CustomButton';
import {
  CategoriesParams,
  useGetCategoriesQuery,
} from '../../../services/notices/noticesApi';
import { TitleIcon } from '../TitleIcon/TitleIcon';

interface HomePageCategoriesProps {
  onCategorySelect: (category: CategoriesParams) => void;
}
export const HomePageCategories: FC<HomePageCategoriesProps> = ({
  onCategorySelect: handleCategorySelect,
}) => {
  const { data, isLoading, isFetching, error } =
    useGetCategoriesQuery(undefined);

  if (isLoading || isFetching) {
    return (
      <div className={'w-full flex items-center justify-center'}>
        <AppLoader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-conduit-gray-100 p-3 pt-1.5 w-full flex items-center justify-center">
        <p className="mb-2">Error while loading popular categories...</p>
      </div>
    );
  }

  return (
    <div className={'text-center w-full flex items-center flex-col'}>
      <h1 className={'text-4xl mb-14 font-poppins'}>Категорії</h1>

      <ul className={'grid grid-cols-4'}>
        {data?.categories.map(category => (
          <li key={category._id}>
            <CustomButton
              className={'min-w-[12rem] max-w-[12rem] mx-12 my-3'}
              onClick={() => handleCategorySelect(category)}
              textSize={TextSize.SMALL}
              title={category.name}>
              <TitleIcon size={32} title={category.name} />
            </CustomButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
