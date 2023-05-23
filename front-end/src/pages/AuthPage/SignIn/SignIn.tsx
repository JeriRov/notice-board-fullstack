import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FiLock, FiLogIn, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { ErrorsList } from '../../../components/ErrorsList/ErrorList';
import { Container } from '../../../containers/Container/Container';
import { SignInRequestParams } from '../../../store/auth/auth.types';
import { useAuth } from '../../../store/auth/useAuth';

const PASSWORD_LOWER = /^(?=.*[a-z])/;
const PASSWORD_UPPER = /^(?=.*[A-Z])/;
const PASSWORD_NUMBER = /^(?=.*[0-9])/;
const validationSchema = yup.object({
  emailOrPhone: yup
    .string()
    // eslint-disable-next-line no-magic-numbers
    .min(3, 'please enter phone number or email')
    .required(),
  password: yup
    .string()
    .required()
    // eslint-disable-next-line no-magic-numbers
    .min(8)
    .matches(PASSWORD_LOWER, 'must contain one lowercase character')
    .matches(PASSWORD_UPPER, 'must contain one uppercase character')
    .matches(PASSWORD_NUMBER, 'must contain one number character'),
});

interface SignInFormValues {
  emailOrPhone: string;
  password: string;
}

export const SignInPage: FC = () => {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignInFormValues>({
    defaultValues: {
      emailOrPhone: undefined,
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const signInData = {
        password: values.password,
      } as SignInRequestParams;

      signInData.phoneNumber = values.emailOrPhone;
      if (values.emailOrPhone.includes('@')) {
        signInData.email = values.emailOrPhone;
      }
      await signIn(signInData);
      navigate('/');
    } catch (e) {
      toast.error('Something went wrong. Please, try again later');
    }
  };
  return (
    <Container>
      <div className={'mt-25'}>
        <h1 className="text-4xl text-center mb-4">Вхід</h1>
        <p className="text-center mb-4">
          <Link to="/sign-up">Ще немає акаунта?</Link>
        </p>
        <form
          className="max-w-xl mx-auto flex flex-col gap-4"
          noValidate={true}
          onSubmit={handleSubmit(onSubmit)}>
          <ErrorsList errors={formState.errors} />

          <CustomTextInput
            placeholder="Емейл або телефон"
            type={'text'}
            {...register('emailOrPhone')}>
            <FiUser size={28} />
          </CustomTextInput>

          <CustomTextInput
            placeholder="Пароль"
            type="password"
            {...register('password')}>
            <FiLock size={28} />
          </CustomTextInput>

          <div className="flex justify-end">
            <CustomButton
              disabled={formState.isSubmitting}
              title={'Ввійти'}
              type={'submit'}>
              <FiLogIn size={28} />
            </CustomButton>
          </div>
        </form>
      </div>
    </Container>
  );
};
