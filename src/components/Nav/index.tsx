import React from "react";
import { useStore } from "store";
import { IPlanet } from "interfaces";
import { useHistory } from "react-router";

// Styles
import "./styles.css";
import cx from "classnames";
import styles from "./index.module.css";

// Material UI
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { Paper, TextField } from "@material-ui/core";

export interface INavProps {}

const Nav: React.FunctionComponent<INavProps> = () => {
  const history = useHistory();
  const [state, dispatch] = useStore();

  const handleChange = (event: any, newValue: string | null): void => {
    dispatch({ type: "SET_FILTER", payload: { filter: newValue } });
  };

  const handleClick = () => {
    history.push("/");
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.backStars}></div>

      <div className={styles.navContent}>
        <span className={styles.logo} onClick={handleClick}></span>

        <span className={styles.search}>
          <Paper className={cx(styles.searchInput, "search-input")}>
            <Autocomplete
              freeSolo
              onChange={handleChange}
              options={state.items.map((item: IPlanet) => item.name)}
              renderInput={params => (
                <TextField
                  {...params}
                  margin="normal"
                  className="input"
                  placeholder="Search Planets"
                />
              )}
            />
            <Search className="icon" aria-label="search" />
          </Paper>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
