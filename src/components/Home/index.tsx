import React from "react";
import cx from "classnames";
import useHome from "./useHome";
import { Sorter } from "../index";
import { IHomeProps } from "interfaces";
import { CircularProgress } from "@material-ui/core";

import styles from "./index.module.css";

const Home: React.FunctionComponent<IHomeProps> = () => {
  const { state, nextLink, Planet, handleClick, loading } = useHome();

  return (
    <section className={styles.container}>
      <div className={styles.home}>
        <div className={styles.homeTitle}>
          <h2>
            {state.filter ? `Search results for: ${state.filter}` : "The planets //"}
          </h2>
          <Sorter />
        </div>

        <div className={styles.results}>
          {state.filtered.length ? state.filtered.map(Planet) : state.items.map(Planet)}
        </div>

        {nextLink && !state.filtered.length && (
          <div className={styles.actionButton}>
            <span
              className={cx(styles.button, loading && styles.loading)}
              onClick={handleClick}>
              <CircularProgress className={styles.progress} />
              <label>show more</label>
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
