import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  username: Yup.string()
    .min(4)
    .max(20)
    .required(),
  password: Yup.string().required(),
});
