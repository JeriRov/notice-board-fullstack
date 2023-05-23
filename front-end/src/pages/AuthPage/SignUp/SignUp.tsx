import React, { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FiLock, FiLogIn, FiMail, FiUser, FiPhone } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../../components/CustomTextInput/CustomTextInput';
import { ErrorsList } from '../../../components/ErrorsList/ErrorList';
import { Container } from '../../../containers/Container/Container';
import { SignUpRequestParams } from '../../../store/auth/auth.types';
import { useAuth } from '../../../store/auth/useAuth';

export interface SignUpFormValues extends SignUpRequestParams {
  confirmPassword?: string;
}
const PASSWORD_LOWER = /^(?=.*[a-z])/;
const PASSWORD_UPPER = /^(?=.*[A-Z])/;
const PASSWORD_NUMBER = /^(?=.*[0-9])/;
const validationSchema = yup.object({
  // eslint-disable-next-line no-magic-numbers
  firstName: yup.string().required().min(3),
  // eslint-disable-next-line no-magic-numbers
  lastName: yup.string().required().min(3),
  email: yup.string().email().optional(),
  // eslint-disable-next-line no-magic-numbers
  phoneNumber: yup.string().required().min(13),
  password: yup
    .string()
    .required()
    // eslint-disable-next-line no-magic-numbers
    .min(8)
    .matches(PASSWORD_LOWER, 'must contain one lowercase character')
    .matches(PASSWORD_UPPER, 'must contain one uppercase character')
    .matches(PASSWORD_NUMBER, 'must contain one number character'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'passwords must match'),
});

export const SignUpPage: FC = () => {
  const { signUp } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignUpRequestParams) => {
    try {
      if (values.email === '') delete values.email;
      await signUp(values);
      navigate('/');
    } catch (e) {
      toast.error('Something went wrong. Please, try again later');
    }
  };
  return (
    <Container>
      <div className={'mt-2'}>
        <h1 className="text-4xl text-center mb-4">Реєстрація</h1>
        <p className="text-center mb-4">
          <Link to="/sign-in">Уже є акаунт?</Link>
        </p>
        <form
          className="max-w-xl mx-auto flex flex-col gap-4"
          noValidate={true}
          onSubmit={handleSubmit(onSubmit)}>
          <ErrorsList errors={formState.errors} />
          <CustomTextInput placeholder="Ім'я" {...register('firstName')}>
            <FiUser size={28} />
          </CustomTextInput>
          <CustomTextInput placeholder="Призвіще" {...register('lastName')}>
            <FiUser size={28} />
          </CustomTextInput>

          <CustomTextInput placeholder="Телефон" {...register('phoneNumber')}>
            <FiPhone size={28} />
          </CustomTextInput>

          <CustomTextInput
            placeholder="Емейл"
            type="email"
            {...register('email')}>
            <FiMail size={28} />
          </CustomTextInput>

          <CustomTextInput
            placeholder="Пароль"
            type="password"
            {...register('password')}>
            <FiLock size={28} />
          </CustomTextInput>
          <CustomTextInput
            placeholder="Підтвердіть пароль"
            type="password"
            {...register('confirmPassword')}>
            <FiLock size={28} />
          </CustomTextInput>

          <div className="flex justify-end">
            <CustomButton
              disabled={formState.isSubmitting}
              title={'Зареєструватись'}
              type={'submit'}>
              <FiLogIn size={28} />
            </CustomButton>
          </div>
        </form>
      </div>
    </Container>
  );
};
