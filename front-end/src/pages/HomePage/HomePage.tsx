import React, { FC, useEffect } from 'react';

import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { CitySearchSelector } from '../../components/CitySearchSelector/CitySearchSelector';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';
import { WhiteCard } from '../../containers/WhiteCard/WhiteCard';
import {
  CategoriesParams,
  CitiesParams,
  useGetCitiesQuery,
} from '../../services/notices/noticesApi';

import { HomePageCategories } from './HomePageCategories/HomePageCategories';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [cityValue, setCityValue] = React.useState<string>('');
  const [cities, setCities] = React.useState<CitiesParams[]>();
  const citiesQuery = useGetCitiesQuery(undefined);

  useEffect(() => {
    setCities(
      citiesQuery.data?.cities.map(city => {
        const str = city.objectName.slice(1).toLowerCase();
        return {
          ...city,
          objectName: city.objectName[0] + str,
        } as CitiesParams;
      }),
    );
  }, [citiesQuery.data]);
  const handleCategorySelect = (category: CategoriesParams) => {
    navigate(`/notices?category=${category.name}`);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/notices?search=${searchValue}&city=${cityValue}`);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleSelectCity = (city: string) => {
    setCityValue(city);
  };

  return (
    <div className={'w-full'}>
      <form onSubmit={handleSubmit}>
        <div className={'p-10 px-64 flex gap-1'}>
          <CustomTextInput
            className={'w-full'}
            name={'search'}
            onChange={handleSearch}
            placeholder={'Search'}
            value={searchValue}>
            <FiSearch size={28} />
          </CustomTextInput>
          <CitySearchSelector
            cities={cities}
            name={'city'}
            onSelectCity={handleSelectCity}
            value={cityValue}
          />
          <CustomButton title={'Пошук'} type={'submit'}>
            <FiSearch size={28} />
          </CustomButton>
        </div>
      </form>
      <WhiteCard>
        <HomePageCategories onCategorySelect={handleCategorySelect} />
      </WhiteCard>
    </div>
  );
};
