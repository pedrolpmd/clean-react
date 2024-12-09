import { Input as InputBase } from "@/presentation/components";
import React from "react";
import { signupState } from "./atoms";
import { useRecoilState } from "recoil";

type Props = {
  type: string
  name: string
  placeholder: string
}

const Input : React.FC<Props>= ({ type, name, placeholder }: Props) => {
  const [state, setState] = useRecoilState(signupState)
  return (
    <InputBase 
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default Input
