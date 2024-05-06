import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import VideoSlider from '../VideoSlider'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import './index.css'

const apiStatusTrending = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const apiStatusOriginal = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const apiStatusTopRated = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    trendingVideos: [],
    originalVideos: [],
    topRatedVideos: [],
    apiStatusTrendings: apiStatusTrending.initial,
    apiStatusOriginals: apiStatusOriginal.initial,
    apiStatusToprated: apiStatusTopRated.initial,
    randomBanner: [],
  }

  componentDidMount() {
    this.getTrendingResults()
    this.getOriginalsResults()
    this.getTopRatedResults()
  }

  getTrendingResults = async () => {
    this.setState({apiStatusTrendings: apiStatusTrending.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
      this.setState({
        trendingVideos: data,
        apiStatusTrendings: apiStatusTrending.success,
      })
    } else {
      this.setState({apiStatusTrendings: apiStatusTrending.failure})
    }
  }

  getOriginalsResults = async () => {
    const {originalVideos} = this.state
    this.setState({apiStatusOriginals: apiStatusOriginal.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        overview: each.overview,
      }))
      const randomValue = Math.floor(Math.random(originalVideos.length) * 10)
      this.setState({
        originalVideos: data,
        apiStatusOriginals: apiStatusOriginal.success,
        randomBanner: data[randomValue],
      })
    } else {
      this.setState({apiStatusOriginals: apiStatusOriginal.failure})
    }
  }

  getTopRatedResults = async () => {
    this.setState({apiStatusToprated: apiStatusTopRated.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        overview: each.overview,
      }))
      this.setState({
        topRatedVideos: data,
        apiStatusToprated: apiStatusTopRated.success,
      })
    } else {
      this.setState({apiStatusToprated: apiStatusTopRated.failure})
    }
  }

  renderOriginalSuccess = () => {
    const {originalVideos} = this.state

    return <VideoSlider videoList={originalVideos} />
  }

  renderOriginal = () => {
    const {apiStatusOriginals} = this.state
    switch (apiStatusOriginals) {
      case apiStatusOriginal.loading:
        return <LoadingView />
      case apiStatusOriginal.success:
        return this.renderOriginalSuccess()
      case apiStatusOriginal.failure:
        return <FailureView retry={this.getOriginalsResults} errorImg="small" />
      default:
        return null
    }
  }

  renderTrendingSuccess = () => {
    const {trendingVideos} = this.state

    return <VideoSlider videoList={trendingVideos} />
  }

  renderTopratedSuccess = () => {
    const {topRatedVideos} = this.state

    return <VideoSlider videoList={topRatedVideos} />
  }

  renderBannerSuccess = () => {
    const {randomBanner} = this.state

    return (
      <ul>
        <h1 className="home-h1">{randomBanner.title}</h1>
        <h1 className="home-p">{randomBanner.overview}</h1>
        <button type="button" className="home-btn">
          Play
        </button>
      </ul>
    )
  }

  renderTrending = () => {
    const {apiStatusTrendings} = this.state
    switch (apiStatusTrendings) {
      case apiStatusTrending.loading:
        return <LoadingView />
      case apiStatusTrending.success:
        return this.renderTrendingSuccess()
      case apiStatusTrending.failure:
        return <FailureView retry={this.getTrendingResults} errorImg="small" />
      default:
        return null
    }
  }

  renderTopRated = () => {
    const {apiStatusToprated} = this.state
    switch (apiStatusToprated) {
      case apiStatusTopRated.loading:
        return <LoadingView />
      case apiStatusTopRated.success:
        return this.renderTopratedSuccess()
      case apiStatusTopRated.failure:
        return <FailureView retry={this.getTrendingResults} errorImg="small" />
      default:
        return null
    }
  }

  renderBanner = () => {
    const {apiStatusOriginals} = this.state
    switch (apiStatusOriginals) {
      case apiStatusOriginal.loading:
        return <LoadingView />
      case apiStatusOriginal.success:
        return this.renderBannerSuccess()
      case apiStatusOriginal.failure:
        return <FailureView retry={this.getOriginalsResults} errorImg="small" />
      default:
        return null
    }
  }

  render() {
    const {randomBanner} = this.state
    return (
      <div className="home-cont">
        <div
          className="home-container"
          style={{backgroundImage: `url(${randomBanner.backdropPath})`}}
          alt={randomBanner.title}
        >
          <Header />
          <div className="banner">{this.renderBanner()}</div>
        </div>
        <div className="slider-container">
          <h1 className="side-head">Trending Now</h1>
          {this.renderTrending()}
          <h1 className="side-head">Top Rated</h1>
          {this.renderTopRated()}
          <h1 className="side-head">Originals</h1>
          {this.renderOriginal()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
