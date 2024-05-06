import {Component} from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  state = {isSearchSelected: false, pageAddress: '', hamburgerStatus: false}

  componentDidMount() {
    const {match} = this.props
    const {path} = match
    this.setState({pageAddress: path})
  }

  onClickSearch = () => {
    this.setState({isSearchSelected: true})
  }

  onClickSearchInput = () => {
    const {getSearchResults} = this.props
    getSearchResults()
  }

  onChangeInput = event => {
    const {getSearchInput} = this.props
    getSearchInput(event.target.value)
  }

  enableHamburger = () => {
    this.setState(prevState => ({hamburgerStatus: !prevState.hamburgerStatus}))
  }

  render() {
    const {isSearchSelected, pageAddress, hamburgerStatus} = this.state

    if (isSearchSelected) {
      return <Redirect to="/search" />
    }
    return (
      <>
        <nav className="header-container">
          <ul className="logo-container">
            <li>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1709644541/logo_mkysbj.png"
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
            </li>

            <Link
              to="/"
              className={pageAddress === '/' ? 'highlight links' : 'links'}
            >
              <li>Home</li>
            </Link>

            <Link
              to="/popular"
              className={
                pageAddress === '/popular' ? 'highlight links' : 'links'
              }
            >
              <li>Popular</li>
            </Link>
          </ul>
          <div className="logo-container1">
            {pageAddress === '/search' ? (
              <div className="search-select">
                <input
                  type="search"
                  className="search-input"
                  onChange={this.onChangeInput}
                  placeholder="Search"
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-btn search-btn-select"
                  onClick={this.onClickSearchInput}
                >
                  <HiOutlineSearch className="icon-color searched-icon" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <HiOutlineSearch className="icon-color" />
              </button>
            )}
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1709732209/Avatar_uuifcp.png"
                alt="profile"
              />
            </Link>
          </div>
        </nav>
        <nav className="header-container-small">
          <ul className="logo-container">
            <li>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1709644541/logo_mkysbj.png"
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
            </li>
          </ul>
          <div className="logo-container1">
            {pageAddress === '/search' ? (
              <div className="search-select">
                <input
                  type="search"
                  className="search-input"
                  onChange={this.onChangeInput}
                  placeholder="Search"
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-btn search-btn-select"
                  onClick={this.onClickSearchInput}
                >
                  <HiOutlineSearch className="icon-color searched-icon" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <HiOutlineSearch className="icon-color" />
              </button>
            )}
            <button
              type="button"
              className="hamburger-btn"
              onClick={this.enableHamburger}
            >
              <img
                src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1714922969/menu-icon_fsmi1y.png"
                alt="profile"
                className="hamburger-icon"
              />
            </button>
          </div>
        </nav>
        {hamburgerStatus ? (
          <ul className="hamburger-menu">
            <Link
              to="/"
              className={pageAddress === '/' ? 'highlight links' : 'links'}
            >
              <li>Home</li>
            </Link>

            <Link
              to="/popular"
              className={
                pageAddress === '/popular' ? 'highlight links' : 'links'
              }
            >
              <li>Popular</li>
            </Link>
            <Link
              to="/account"
              className={
                pageAddress === '/account' ? 'highlight links' : 'links'
              }
            >
              <li>Account</li>
            </Link>
            <button
              type="button"
              onClick={this.enableHamburger}
              className="close-btn"
            >
              <img
                src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1715009132/close_bzrv19.png"
                alt="close"
                className="close-img"
              />
            </button>
          </ul>
        ) : (
          ''
        )}
      </>
    )
  }
}

export default withRouter(Header)
