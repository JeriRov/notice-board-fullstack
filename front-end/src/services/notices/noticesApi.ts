import { createApi } from '@reduxjs/toolkit/query/react';

import { NOTICE_PAGE_SIZE } from '../../constants/costs';
import { apiBaseQuery } from '../api/baseQuery';

export interface Characteristic {
  name: string;
  type: string;
  value?: string;
}

export interface CategoriesParams {
  _id: string;
  name: string;
  characteristics?: Characteristic[];
}
export interface CategoriesResponse {
  categories: CategoriesParams[];
}
export interface CitiesParams {
  _id: string;
  objectName: string;
  objectCategory?: string;
  region?: string;
  community?: string;
}

export interface CitiesResponse {
  cities: CitiesParams[];
}

export interface SearchParams {
  search: string;
}
export interface ByIdParams {
  id: string;
}

export interface NoticeParams {
  page: number;
  isPersonalNotices: boolean;
  category: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  city: string;
}

export interface ItemCharacteristic {
  name: string;
  type: string;
  value: string;
}

export interface ItemCategory {
  name: string;
  characteristics: ItemCharacteristic[];
}
export interface Item {
  category: ItemCategory;
  price: number;
}
export interface CityParams {
  cityId: string;
}
export interface NoticeBoardData {
  notices: Notice[];
  noticesCount: number;
}

export interface Notice {
  _id?: string;
  userId?: string;
  featured?: boolean;
  title: string;
  city: string;
  description: string;
  dateAdded: string;
  photos?: string[];
  item: Item;
}
export interface UserParams {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  cityId: string;
  phoneNumber: string;
  city: string;
  avatar: string;
}
export const noticesApi = createApi({
  reducerPath: 'noticesApi',
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    getCategories: builder.query<CategoriesResponse, undefined>({
      query: () => ({
        url: '/categories',
      }),
    }),
    getCities: builder.query<CitiesResponse, undefined>({
      query: () => ({
        url: `/cities/names`,
      }),
    }),
    getSearchCities: builder.query<CitiesResponse, SearchParams>({
      query: ({ search }) => ({
        url: `/cities/names/${search}`,
      }),
    }),
    getNoticeById: builder.query<Notice, ByIdParams>({
      query: ({ id }) => ({
        url: `/notices/${id}`,
      }),
    }),
    getNotices: builder.query<NoticeBoardData, NoticeParams>({
      query: ({
        page,
        isPersonalNotices,
        category,
        city,
        search,
        maxPrice,
        minPrice,
      }) => ({
        url: isPersonalNotices ? '/notices/personal' : `/notices`,
        params: {
          limit: NOTICE_PAGE_SIZE,
          offset: page * NOTICE_PAGE_SIZE,
          category,
          city,
          search,
          maxPrice,
          minPrice,
        },
      }),
    }),
    getUserCity: builder.query<CitiesParams, CityParams>({
      query: ({ cityId }) => ({
        url: `/cities/user/${cityId}`,
      }),
    }),
    getUserById: builder.query<UserParams, ByIdParams>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
    }),
    createNotice: builder.mutation<Notice, Notice>({
      query: ({ title, description, city, userId, item, photos, featured }) => {
        const data: Notice = {
          dateAdded: Date.now().toString(),
          title,
          city,
          description,
          item,
          userId,
          photos,
          featured,
        };

        return {
          url: '/notices',
          method: 'post',
          data,
        };
      },
    }),
    updateNotice: builder.mutation<Notice, Notice>({
      query: ({
        _id,
        title,
        description,
        city,
        userId,
        dateAdded,
        item,
        photos,
        featured,
      }) => {
        const data: Notice = {
          dateAdded,
          city,
          description,
          item,
          title,
          userId,
          photos,
          featured,
        };

        return {
          url: `/notices/${_id}`,
          method: 'put',
          data,
        };
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetNoticeByIdQuery,
  useLazyGetNoticeByIdQuery,
  useLazyGetUserByIdQuery,
  useGetNoticesQuery,
  useLazyGetUserCityQuery,
  useLazyGetSearchCitiesQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
} = noticesApi;
