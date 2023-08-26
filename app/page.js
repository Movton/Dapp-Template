'use client'
import styles from '@/app/Styles/page.module.css'
import Btn from './Components/Btns/btn';



export default function Home() {

  const openHooks = () => {
    window.open('/hook', '_self')
  }

  return (
    <main className={styles.main}>
      <div className={styles.btn} onClick={openHooks}>
        <Btn>Watch Hooks</Btn>
      </div>
    </main>
  );
}
