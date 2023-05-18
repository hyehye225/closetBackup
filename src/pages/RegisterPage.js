import React from 'react';
import AuthTemplate from '../components/auth(구버전,삭제예정)/AuthTemplate';
import AuthForm from '../components/auth(구버전,삭제예정)/AuthForm';
import LoginForm from '../components/auth(구버전,삭제예정)/LoginForm';
import RegisterForm from '../components/auth(구버전,삭제예정)/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
