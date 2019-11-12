import * as Yup from 'yup';

export const signupValidation = Yup.object().shape({
  username: Yup.string()
    .min(4)
    .max(20)
    .required(),
  email: Yup.string()
    .email()
    .required(),
  name: Yup.string()
    .min(2)
    .max(50),
  password: Yup.string()
    .min(8)
    .required(),
  passwordConfirmation: Yup.string()
    .min(8)
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
