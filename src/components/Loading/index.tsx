import React from "react";
import { ILoadingProps } from "interfaces";

// Styles
import styles from "./index.module.css";

const Loading: React.FunctionComponent<ILoadingProps> = () => {
  return (
    <section className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.spinner}>
          <div className={styles.loadingSpinner}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <p>Loading...</p>
        </div>
      </div>
    </section>
  );
};

export default Loading;
