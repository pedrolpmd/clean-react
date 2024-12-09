import { atom } from 'recoil'

export const signupState = atom({
  key: 'signupState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    emailError: '',
    nameError: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  }
})
