import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const { state } = useContext(Context)
  
  return (
    <button
      data-testid='submit'
      disabled={state.isFormInvalid}
      className={Styles.submit}
      type="submit">
      {text}
    </button>
  )
}

export default SubmitButton
