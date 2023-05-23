import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { FiMapPin } from 'react-icons/fi';

import {
  CitiesParams,
  useLazyGetSearchCitiesQuery,
} from '../../services/notices/noticesApi';
import { CustomTextInput } from '../CustomTextInput/CustomTextInput';

interface SelectCityProps {
  cities?: CitiesParams[];
  onSelectCity: (city: string) => void;
  className?: string;
  require?: boolean;
  name?: string;
  value?: string;
}

export const CitySearchSelector: FC<SelectCityProps> = ({
  cities,
  onSelectCity,
  className,
  require = false,
  name,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchCities, setFetchCities] = useState<CitiesParams[]>([]);
  const [searchTrigger] = useLazyGetSearchCitiesQuery();

  useEffect(() => {
    setFetchCities(cities || []);
  }, [cities, value]);
  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const { data } = await searchTrigger({ search: value }, false);

    setFetchCities(
      data?.cities.map(city => {
        const str = city.objectName.slice(1).toLowerCase();
        return { ...city, objectName: city.objectName[0] + str };
      }) ||
        cities ||
        [],
    );
    onSelectCity(searchTerm);
  };
  const handleBlur = () => {
    if (!fetchCities?.find(city => city.objectName === searchTerm)) {
      setSearchTerm('');
    }
  };
  const handleSelectCity = (city: CitiesParams) => {
    setSearchTerm(city.objectName);
    onSelectCity(searchTerm);
  };

  return (
    <div className="relative w-1/5">
      <CustomTextInput
        className={className}
        list={'details'}
        name={name}
        onBlur={handleBlur}
        onChange={handleSearch}
        placeholder="Місто"
        required={require}
        type="text"
        value={searchTerm || value}>
        <FiMapPin size={28} />
      </CustomTextInput>
      <datalist
        className={
          'absolute max-h-20 border-0 overflow-x-hidden overflow-y-auto'
        }
        id="details">
        className=
        {`block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white`}
        {fetchCities?.map(city => (
          <option
            className={
              'text-xs p-0.3 bg-blue-300 cursor-pointer hover:text-white hover:bg-blue-500 hover:outline-none'
            }
            data-id={city._id}
            key={city._id}
            onClick={() => handleSelectCity(city)}
            value={city.objectName}>
            {city.objectName}
          </option>
        ))}
      </datalist>
    </div>
  );
};
