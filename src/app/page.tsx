import "@fontsource/modak";
import Header from "./components/Header";
import Chunker from "./components/Chunker";
import Footer from "./components/Footer";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Chunker />
      </main>
      <Footer />
    </>
  );
}
