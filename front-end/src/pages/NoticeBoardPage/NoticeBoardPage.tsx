import React, { FC, useEffect, useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Container } from '../../containers/Container/Container';
import { usePageParam } from '../../hooks/usePageParam';
import {
  CitiesParams,
  NoticeParams,
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetNoticesQuery,
} from '../../services/notices/noticesApi';

import { NoticeBoard } from './NoticeBoard/NoticeBoard';
import { NoticeFilters } from './NoticeFilters/NoticeFilters';

export const NoticeBoardPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPriceValue, setMinPriceValue] = useState<string>('');
  const [maxPriceValue, setMaxPriceValue] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [cities, setCities] = useState<CitiesParams[]>();
  const { category } = useParams();
  const navigate = useNavigate();
  const pageParams = usePageParam();
  const [searchParams] = useSearchParams();
  const categoriesQuery = useGetCategoriesQuery(undefined);
  const citiesQuery = useGetCitiesQuery(undefined);
  const { data, isLoading, isFetching, error } = useGetNoticesQuery({
    page: pageParams.page,
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    isPersonalNotices: false,
  } as NoticeParams);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setMinPriceValue(searchParams.get('minPrice') || '');
    setMaxPriceValue(searchParams.get('maxPrice') || '');
    setSearch(searchParams.get('search') || '');
    setCity(searchParams.get('city') || '');
    setCities(
      citiesQuery.data?.cities.map(city => {
        const str = city.objectName.slice(1).toLowerCase();
        return {
          ...city,
          objectName: city.objectName[0] + str,
        } as CitiesParams;
      }),
    );
  }, [category, citiesQuery.data?.cities, data, searchParams]);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleSearchMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value &&
      maxPriceValue &&
      setMinPriceValue(
        Math.min(parseInt(e.target.value), parseInt(maxPriceValue)).toString(),
      );
  };
  const handleSelectMinPriceOption = (value: string) => {
    setMinPriceValue(value);
  };
  const handleSearchMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceValue(e.target.value);
  };
  const handleSelectMaxPriceOption = (value: string) => {
    setMaxPriceValue(value);
  };

  const handleClick = async () => {
    // TODO: add validation
  };
  const handleSelectCity = (city: string) => {
    setCity(city);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleClickNoticeItem = (id: string | undefined) => {
    navigate(`/notices/${id || ''}`);
  };
  return (
    <Container>
      <NoticeFilters
        categories={categoriesQuery.data?.categories || []}
        cities={cities || []}
        cityValue={city}
        maxPriceValue={maxPriceValue}
        minPriceValue={minPriceValue}
        onCategoryChange={handleCategoryChange}
        onClick={handleClick}
        onSearch={handleSearch}
        onSearchMaxPrice={handleSearchMaxPrice}
        onSearchMinPrice={handleSearchMinPrice}
        onSelectCity={handleSelectCity}
        onSelectMaxPriceOption={handleSelectMaxPriceOption}
        onSelectMinPriceOption={handleSelectMinPriceOption}
        searchValue={search}
        selectedCategory={selectedCategory}
      />
      <NoticeBoard
        data={data}
        error={error}
        isFetching={isFetching}
        isLoading={isLoading}
        onClickItem={handleClickNoticeItem}
      />
    </Container>
  );
};
