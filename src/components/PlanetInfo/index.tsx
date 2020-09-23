import React from "react";
import * as helpers from "helpers";
import { Loading } from "../index";
import { getPlanetById } from "api";
import { useParams } from "react-router";
import { IPlanet, IPlanetInfoProps, IPlanetParams, IResident, IFilm } from "interfaces";

// Styles
import styles from "./index.module.css";

const PlanetInfo: React.FunctionComponent<IPlanetInfoProps> = () => {
  const { id } = useParams<IPlanetParams>();
  const [loading, setLoading] = React.useState(true);
  const [planet, setPlanet] = React.useState<IPlanet>();
  const [residents, setResidents] = React.useState<IResident[]>([]);
  const [films, setFilms] = React.useState<IFilm[]>([]);

  React.useEffect(() => {
    const getPlanet = async () => {
      try {
        const planet = await getPlanetById(id);
        const { resident, film } = helpers.getAllExtra(planet);

        const [resResult, filmResult] = await Promise.all([
          Promise.all(resident),
          Promise.all(film)
        ]);

        setResidents(resResult);
        setFilms(filmResult);

        setPlanet(planet);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getPlanet();
  }, [id]);

  if (loading) return <Loading />;
  if (!planet) return null;

  return (
    <section className={styles.container}>
      <div className={styles.planetInfo}>
        <div className={styles.title}>
          <h2>{planet.name} //</h2>
        </div>

        <div className={styles.information}>
          <span className={styles.imageWrapper}>
            <img
              alt={planet.name}
              className={styles.image}
              src={helpers.getUrlImage(planet.name)}
            />
          </span>

          <span className={styles.infoWrapper}>
            <p>
              <strong>Name:</strong>
              {planet.name}
            </p>
            <p>
              <strong>Rotation Period:</strong>
              {planet.rotation_period}
            </p>
            <p>
              <strong>Orbital Period:</strong>
              {planet.orbital_period}
            </p>
            <p>
              <strong>Diameter:</strong>
              {planet.diameter}
            </p>
            <p>
              <strong>Climate:</strong>
              {planet.climate}
            </p>
            <p>
              <strong>Gravity:</strong>
              {planet.gravity}
            </p>
            <p>
              <strong>Terrain:</strong>
              {planet.terrain}
            </p>
            <p>
              <strong>Surface Water:</strong>
              {planet.surface_water}
            </p>
            <p>
              <strong>Population:</strong>
              {planet.population}
            </p>
            <p>
              <strong>Last Edited:</strong>
              {new Date(planet.edited).toLocaleDateString()}
            </p>
          </span>
        </div>

        {(films.length > 0 || residents.length > 0) && (
          <div className={styles.card}>
            <div className={styles.residents}>
              <h2>People that live on this planet:</h2>
              {residents.map((resident: IResident) => (
                <span key={resident.url}>{resident.name}</span>
              ))}
            </div>
            <div className={styles.films}>
              <h2>Films that this planet has appeared in:</h2>
              {films.map((film: IFilm) => (
                <span key={film.url}>{film.title}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanetInfo;
