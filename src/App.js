import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/Home'
import PopularPage from './components/PopularPage'
import NotFound from './components/NotFound'
import AccountDetails from './components/AccountDetails'
import SearchPage from './components/SearchPage'
import MovieDetails from './components/MovieDetails'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/popular" component={PopularPage} />
    <ProtectedRoute exact path="/account" component={AccountDetails} />
    <ProtectedRoute exact path="/search" component={SearchPage} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

// RJSCP79ATS
