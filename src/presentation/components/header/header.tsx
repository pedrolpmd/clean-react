import React, { memo } from "react"
import Styles from './survey-list-styles.scss'
import { Logo } from "@/presentation/components"

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Pedro</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>

  )
}

export default memo(Header)