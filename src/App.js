import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/Home'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/" component={HomePage} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
