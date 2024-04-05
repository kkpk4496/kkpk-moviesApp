import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUser = event => {
    this.setState({username: event.target.value})
  }

  onChangePswd = event => {
    this.setState({password: event.target.value})
  }

  onSubmitData = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({username: '', password: ''})
    history.replace('/')
  }

  onFailureData = error => {
    this.setState({errMsg: error})
  }

  loginReq = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitData(data.jwt_token)
    } else {
      this.onFailureData(data.error_msg)
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <img
          src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1709644541/logo_mkysbj.png"
          alt="login website logo"
          className="login-logo"
        />
        <form className="login-container" onSubmit={this.loginReq}>
          <h1 className="login-title">Login</h1>
          <div className="input-container">
            <label htmlFor="user" className="labels">
              USERNAME
            </label>
            <input
              type="text"
              id="user"
              onChange={this.onChangeUser}
              value={username}
              className="inputs"
            />
          </div>
          <div className="input-container">
            <label htmlFor="pswd" className="labels">
              PASSWORD
            </label>
            <input
              type="password"
              id="pswd"
              onChange={this.onChangePswd}
              value={password}
              className="inputs"
            />
          </div>
          <p className="errorMsg">{errMsg}</p>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginPage
