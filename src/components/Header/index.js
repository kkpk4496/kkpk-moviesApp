import {Component} from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  state = {isSearchSelected: false, pageAddress: ''}

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

  render() {
    const {isSearchSelected, pageAddress} = this.state

    if (isSearchSelected) {
      return <Redirect to="/search" />
    }
    return (
      <nav className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1709644541/logo_mkysbj.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <Link
            to="/"
            className={pageAddress === '/' ? 'highlight links' : 'links'}
          >
            Home
          </Link>
          <Link
            to="/popular"
            className={pageAddress === '/popular' ? 'highlight links' : 'links'}
          >
            Popular
          </Link>
        </div>
        <div className="logo-container1">
          {pageAddress === '/search' ? (
            <div className="search-select">
              <input
                type="text"
                className="search-input"
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                test-id="searchButton"
                className="search-btn"
                onClick={this.onClickSearchInput}
              >
                <HiOutlineSearch className="icon-color searched-icon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              test-id="searchButton"
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
    )
  }
}

export default withRouter(Header)
