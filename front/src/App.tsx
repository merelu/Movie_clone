import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import LandingPage from "@pages/LandingPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import Auth from "@hoc/Auth";
import NavBar from "@components/NavBar";
import MovieDetailPage from "@pages/MovieDetailPage";
import FavoritePage from "@pages/FavoritePage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div>
        <Switch>
          <Route path="/" exact component={Auth(LandingPage, null)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route
            path="/movie/:movieId"
            component={Auth(MovieDetailPage, null)}
          />
          <Route path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
