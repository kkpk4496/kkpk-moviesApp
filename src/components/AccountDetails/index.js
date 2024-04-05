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
        <p className="accounts-para">
          <span className="span">Member ship</span>rahul@gmail.com
        </p>
        <p className="para1">Password : ************</p>
        <hr className="hr" />
        <p className="accounts-para">
          <span className="span span1">Plan Details</span>Premium
          <span className="span2">Ultra HD</span>
        </p>
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
