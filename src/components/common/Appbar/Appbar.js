import React from "react";
import Navigation from "../../Navigation/Navigation";
import styles from "./Appbar.module.scss";

function Appbar() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
}

export default Appbar;
