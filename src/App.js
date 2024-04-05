import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/Home'
import PopularPage from './components/PopularPage'
import NotFound from './components/NotFound'
import AccountDetails from './components/AccountDetails'
import SearchPage from './components/SearchPage'
import MovieDetails from './components/MovieDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/popular" component={PopularPage} />
    <Route exact path="/account" component={AccountDetails} />
    <Route exact path="/search" component={SearchPage} />
    <Route exact path="/movies/:id" component={MovieDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
