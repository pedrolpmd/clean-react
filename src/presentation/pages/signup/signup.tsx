import { AddAccount } from '@/domain/usecases'
import { currentAccountState, Footer, FormStatus, LoginHeader } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Input, signupState, SubmitButton } from './components'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation,
  addAccount: AddAccount,
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(signupState)

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = {
      name, email, password, passwordConfirmation
    }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState(old => ({
      ...old,
      isFormInvalid: !!nameError || !!passwordError ||
        !!emailError || !!passwordConfirmationError,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      setCurrentAccount(account)
      history.replace('/')

    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar conta</h2>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu email" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <SubmitButton text='Cadastrar' />
        <Link replace to='/login' data-testid='login-link' className={Styles.link}>Voltar para Login</Link>
        <FormStatus state={state} />
      </form>
      <Footer />
    </div>
  )
}

export default Signup
