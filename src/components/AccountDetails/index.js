import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const AccountDetails = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="accounts-bg">
      <Header />
      <div className="accounts-container">
        <h1 className="accounts-head">Account</h1>
        <hr className="hr" />
        <div className="para-container">
          <p className="span">Member ship</p>
          <p className="accounts-para">rahul@gmail.com</p>
        </div>
        <p className="para1">Password : ************</p>
        <hr className="hr" />
        <div className="para-container">
          <p className="span span1">Plan Details</p>
          <p className="accounts-para">Premium</p>
          <p className="span2">Ultra HD</p>
        </div>
        <hr className="hr" />
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(AccountDetails)
