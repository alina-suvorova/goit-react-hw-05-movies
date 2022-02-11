import './App.css';
import  Container  from './components/Container/Container';
import Appbar from './components/Appbar/Appbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Homepage } from './views/Homepage';
import { useState } from 'react';
import { MoviesSearchForm } from './views/MovieSearchForm';
import { MovieCardView } from './views/MovieCardView';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(null);

  const pageForCard = name => {
    setPage(name);
  };
  return (
    <>
      <Container>
        <Appbar clearQuery={setQuery} />
        <Switch>
          <Route exact path="/">
            <Homepage changePage={pageForCard} />
          </Route>
          <Route exact path="/movies">
            <MoviesSearchForm
              saveQuery={setQuery}
              queryApp={query}
              changePage={pageForCard}
            />
          </Route>

          <Route path="/movies/:slug">
            <MovieCardView
              query={query}
              saveQuery={setQuery}
              currentPage={page}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </>
  );
}


export default App;
