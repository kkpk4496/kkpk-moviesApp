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

class PopularPage extends Component {
  state = {popularResults: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getPopularResults()
  }

  getPopularResults = async () => {
    this.setState({apiStatus: apiStatusValue.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.results)
      const data = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      this.setState({popularResults: data, apiStatus: apiStatusValue.success})
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderSuccess = () => {
    const {popularResults} = this.state
    return (
      <ul className="video-list">
        {popularResults.map(each => (
          <li key={each.id}>
            <VideoThumbnails key={each.id} videoDetails={each} />
          </li>
        ))}
      </ul>
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
        return <FailureView retry={this.getPopularResults} errorImg="big" />
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
        {this.apiStatus()}
        <Footer />
      </div>
    )
  }
}
export default PopularPage
