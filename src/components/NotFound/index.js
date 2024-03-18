import {withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="notfound-bg">
      <h1 className="notfound-head">Lost Your Way?</h1>
      <p className="notfound-para">
        We are sorry the page you requested could not be found
        <br />
        Please go back to the homepage.
      </p>
      <button className="notfound-btn" type="button" onClick={onClickHome}>
        Go to Home
      </button>
    </div>
  )
}
export default withRouter(NotFound)
