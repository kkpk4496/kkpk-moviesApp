import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import VideoThumbnails from '../VideoThumbnails'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SearchPage extends Component {
  state = {givenInput: '', searchResults: [], apiStatus: apiStatusValue.initial}

  getSearchInput = inputs => {
    this.setState({givenInput: inputs})
  }

  getSearchResults = async () => {
    const {givenInput, apiStatus} = this.state
    console.log(apiStatus)
    this.setState({apiStatus: apiStatusValue.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${givenInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const data = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      this.setState({searchResults: data, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderSuccess = () => {
    const {searchResults} = this.state
    return (
      <>
        {searchResults.length !== 0 ? (
          <>
            {searchResults.map(each => (
              <li key={each.id}>
                <VideoThumbnails key={each.id} videoDetails={each} />
              </li>
            ))}
          </>
        ) : (
          this.renderFailure()
        )}
      </>
    )
  }

  renderFailure = () => {
    const {givenInput} = this.state
    return (
      <div className="load">
        <img
          src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1710940248/search_error_nwatnq.png"
          alt="wrong"
        />
        <h1 className="failure-head">
          Your search for {givenInput} did not find any matches.
        </h1>
      </div>
    )
  }

  apiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.loading:
        return <LoadingView />
      case apiStatusValue.success:
        return this.renderSuccess()
      case apiStatusValue.failure:
        return <FailureView retry={this.getSearchResults} errorImg="big" />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-container">
        <Header
          getSearchInput={this.getSearchInput}
          getSearchResults={this.getSearchResults}
        />
        <ul className="video-list">{this.apiStatus()}</ul>
        <Footer />
      </div>
    )
  }
}
export default SearchPage
