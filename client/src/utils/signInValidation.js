import * as Yup from 'yup';

const getCharacterValidationError = str => {
    return `Your password must have at least 1 ${str} character`;
};

export const validation = Yup.object().shape({
    email: Yup.string().email('@Invalid Email Id').required(' **Email Id is required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[@\$\*\&]/, getCharacterValidationError("special character(@, $, *, &"))
        .required('**Password is Required')
});