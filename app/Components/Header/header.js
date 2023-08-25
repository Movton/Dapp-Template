'use client'
import { ConnectBtn } from '../Btns/btn'
import styles from './header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }


  return (
    <>
    <div className={styles.burgers} onClick={toggleMenu}>
        <div className={`${styles.burger} ${isOpen ? styles.open1 : ''}`}></div>
        <div className={`${styles.burger} ${isOpen ? styles.open2 : ''}`}></div>
        <div className={`${styles.burger} ${isOpen ? styles.open3 : ''}`}></div>
    </div>
    <div className={styles.container}>
    <Image src="/images/assets/logo.png" alt="logo" width={250} height={95} className={styles.mobileLogo} />
        <div className={`${styles.header} ${isOpen ? styles.open : ''}`}>
            <div className={styles.logo}>
                <Image src="/images/assets/logo.png" alt="logo" width={250} height={95} />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navLinks}>
                    <li className={styles.navLink}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.navLink}>
                        <Link href="/">About</Link>
                    </li>
                    <li className={styles.navLink}>
                        <a href="https://twitter.com/EienDev_" target="_blank">Twitter</a>
                    </li>
                </ul>
            </nav>
            <ConnectBtn />
        </div>
    </div>
    </>
    )
}

export default Header