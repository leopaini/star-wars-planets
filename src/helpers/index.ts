import { getByUrl } from "api";
import { IPlanet, IResident, IFilm } from "interfaces";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(",")
  }
});

export const getUrlImage = (name: string) => {
  const imageName = name.toLowerCase().split(" ").join("-");
  try {
    const result = require(`assets/images/planets/${imageName}.jpg`);
    return result;
  } catch (error) {
    return require("assets/images/no-planet.jpg");
  }
};

export const getAllExtra = (planet: IPlanet) => {
  const residentPromises = [];
  for (let resident of planet.residents) {
    residentPromises.push(getByUrl<IResident>(resident));
  }
  const filmPromises = [];
  for (let film of planet.films) {
    filmPromises.push(getByUrl<IFilm>(film));
  }
  return { resident: residentPromises, film: filmPromises };
};
