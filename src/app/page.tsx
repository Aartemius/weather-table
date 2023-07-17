import TemperatureGraphics from '@/components/TemperatureGraphics'
import styles from './page.module.css'
import TableCities from '@/components/TableCities'

export default function Home() {

  return (
    <main className={styles.main}>
      <TemperatureGraphics />
      <TableCities />
    </main>
  )
}
