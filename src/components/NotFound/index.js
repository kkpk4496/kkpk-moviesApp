import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-bg">
    <h1 className="notfound-head">Lost Your Way</h1>
    <p className="notfound-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="notfound-btn" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
