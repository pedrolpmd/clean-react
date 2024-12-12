import { currentAccountState, Logo } from "@/presentation/components"
import { useLogout } from "@/presentation/hooks"
import React, { memo } from "react"
import { useRecoilValue } from "recoil"
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const logout = useLogout()

  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid='username'>{getCurrentAccount().name}</span>
          <a data-testid='logout' href="#" onClick={buttonClick}>Sair</a>
        </div>
      </div>
    </header>

  )
}

export default memo(Header)
