import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Latest from "./components/Latest";
import Movies from "./components/Movies";
import MyList from "./components/MyList";
import Rewatch from "./components/Rewatch";
import {
  HOME_ROUTE,
  LATEST_ROUTE,
  MOVIES_ROUTE,
  MYLIST_ROUTE,
  REWATCH_ROUTE,
  TVSHOWS_ROUTE,
} from "./components/Constants";
import TvShows from "./components/TvShows";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={TVSHOWS_ROUTE} element={<TvShows />} />
          <Route path={MOVIES_ROUTE} element={<Movies />} />
          <Route path={LATEST_ROUTE} element={<Latest />} />
          <Route path={MYLIST_ROUTE} element={<MyList />} />
          <Route path={REWATCH_ROUTE} element={<Rewatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
