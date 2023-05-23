import { createApi } from '@reduxjs/toolkit/query/react';

import {
  SignInRequestParams,
  SignUpRequestParams,
  AuthResponseParams,
} from '../../store/auth/auth.types';
import { apiBaseQuery } from '../api/baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    signUp: builder.query<AuthResponseParams, SignUpRequestParams>({
      query: args => {
        const data: SignUpRequestParams = {
          ...args,
        };
        return {
          url: '/auth/register',
          method: 'post',
          data,
        };
      },
    }),

    signIn: builder.query<AuthResponseParams, SignInRequestParams>({
      query: args => {
        const data = {
          ...args,
        };

        return {
          url: '/auth/login',
          method: 'post',
          data,
        };
      },
    }),
  }),
});

export const { useLazySignUpQuery, useLazySignInQuery } = authApi;
