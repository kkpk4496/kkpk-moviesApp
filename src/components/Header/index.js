import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineSearch} from 'react-icons/md'
import './index.css'

class Header extends Component {
  state = {inputs: ''}

  render() {
    return (
      <nav className="header-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1709644541/logo_mkysbj.png"
            alt="logo"
            className="header-logo"
          />
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/popular" className="links">
            Popular
          </Link>
        </div>
        <div className="logo-container1">
          <MdOutlineSearch className="icon-color" />
          <img
            src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1709732209/Avatar_uuifcp.png"
            alt="icon"
          />
        </div>
      </nav>
    )
  }
}

export default Header
