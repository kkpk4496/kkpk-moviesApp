import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class MovieDetails extends Component {
  state = {movieData: []}

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const data = fetchedData.movie_details
      console.log(data)
      const videoDetails = {
        id: data.id,
        overview: data.overview,
        title: data.title,
        backdropPath: data.backdrop_path,
        posterPath: data.poster_path,
        adult: data.adult,
        budget: data.budget,
        runtime: data.runtime,
        releaseDate: data.release_date,
        genres: data.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
      }
      this.setState({movieData: videoDetails})
    }
  }

  render() {
    const {movieData} = this.state
    const {genres} = movieData
    console.log(genres)
    const image = movieData.backdropPath
    const runHours = Math.floor(movieData.runtime / 60)
    const runMin = movieData.runtime % 60
    const date = new Date(movieData.releaseDate)
    const releaseYear = date.getFullYear()
    return (
      <div className="details-cont">
        <div
          className="details-container"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <Header />
          <div className="details-banner">
            <h1 className="details-h1">{movieData.title}</h1>
            <div className="release-details-cont">
              <p>
                {runHours}h {runMin}m
              </p>
              <p className="adult">{movieData.adult ? 'A' : 'U/A'}</p>
              <p>{releaseYear}</p>
            </div>
            <p className="details-p">{movieData.overview}</p>
            <button type="button" className="details-btn">
              Play
            </button>
          </div>
        </div>
        <h1>Genres</h1>
        <ul>
          {genres.map(each => (
            <li key={each.id}>{each.name}</li>
          ))}
        </ul>
        <div className="slider-container">
          <h1 className="side-head">Trending Now</h1>
        </div>
        <Footer />
      </div>
    )
  }
}

export default MovieDetails
