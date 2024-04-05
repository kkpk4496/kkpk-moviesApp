import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import VideoSlider from '../VideoSlider'
import './index.css'

class Home extends Component {
  state = {trendingVideos: [], originalVideos: []}

  componentDidMount() {
    this.getTrendingResults()
    this.getOriginalsResults()
  }

  getTrendingResults = async () => {
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
      console.log(fetchedData.results)
      const data = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      this.setState({trendingVideos: data})
    }
  }

  getOriginalsResults = async () => {
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
      console.log(fetchedData.results)
      const data = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      this.setState({originalVideos: data})
    }
  }

  render() {
    const {trendingVideos, originalVideos} = this.state
    return (
      <div className="home-cont">
        <div className="home-container">
          <Header />
          <div className="banner">
            <h1 className="home-h1">Super Man</h1>
            <p className="home-p">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <button type="button" className="home-btn">
              Play
            </button>
          </div>
        </div>
        <div className="slider-container">
          <h1 className="side-head">Trending Now</h1>
          <VideoSlider videoList={trendingVideos} className="slide-position" />
          <h1 className="side-head">Originals</h1>
          <VideoSlider videoList={originalVideos} className="slide-position" />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
