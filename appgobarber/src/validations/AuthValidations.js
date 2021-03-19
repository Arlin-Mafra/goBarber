import * as Yup from 'yup';

const AuthValidation = {
  signin: Yup.object().shape({
    email: Yup.string()
      .email('Por favor coloque um email valido')
      .required('Endereço de e-mail é obrigatório'),
    password: Yup.string()
      .min(6, ({ min }) => `A senha deverá ter no minimo ${min} characters`)
      .required('Password é obrigatório'),
  }),

  signUp: Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .email('Por favor coloque um email valido')
      .required('Endereço de e-mail é obrigatório'),
    password: Yup.string()
      .min(6, ({ min }) => `A senha deverá ter no minimo ${min} characters`)
      .required('Password é obrigatório'),
  }),
};

export default AuthValidation;
