import React from "react";
import { IRouterProps } from "interfaces";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Store Provider
import { StoreProvider } from "../store";

// Theme
import { theme } from "../helpers";
import { ThemeProvider } from "@material-ui/core/styles";

// Components
import { Home, Nav, PlanetInfo } from "components";

const Router: React.FunctionComponent<IRouterProps> = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Nav />
          <Switch>
            <Route path="/planet/:id" component={PlanetInfo} />
            <Route exact path="/" component={Home} />
            {/* <Route path="/*">
              <Redirect to="/" />
            </Route> */}
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default Router;
