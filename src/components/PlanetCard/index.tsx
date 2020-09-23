import React from "react";
import { getUrlImage } from "helpers";
import { Card } from "@material-ui/core";
import { useHistory } from "react-router";
import { IPlanetCardProps } from "interfaces";

import styles from "./index.module.css";

const PlanetCard: React.FunctionComponent<IPlanetCardProps> = ({ planet }) => {
  const history = useHistory();

  const handleClick = (): void => {
    const id = planet.url.split("/")[5];
    history.push(`/planet/${id}`);
  };

  return (
    <Card className={styles.planetCard} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <img src={getUrlImage(planet.name)} alt={planet.name} className={styles.image} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.backImage}></div>
        <div className={styles.content}>
          <h2>{planet.name}</h2>
          <p className={styles.listItem}>
            <strong>Climate:</strong>
            {planet.climate}
          </p>
          <p className={styles.listItem}>
            <strong>Orbital Period:</strong>
            {planet.orbital_period}
          </p>
          <p className={styles.listItem}>
            <strong>Gravity:</strong>
            {planet.gravity}
          </p>

          <span className={styles.link}>THE STAR WARS API</span>
          <div className={styles.decal}></div>
        </div>
      </div>
    </Card>
  );
};

export default PlanetCard;
