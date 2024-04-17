import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
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

class MovieDetails extends Component {
  state = {movieData: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({apiStatus: apiStatusValue.loading})
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
        ratingCount: data.vote_count,
        ratingAvg: data.vote_average,
        genres: data.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
        languages: data.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),
        similarMovies: data.similar_movies.map(each => ({
          id: each.id,
          title: each.title,
          posterPath: each.poster_path,
          backdropPath: each.backdrop_path,
        })),
      }
      this.setState({
        movieData: videoDetails,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderSuccess = () => {
    const {movieData} = this.state
    const image = movieData.backdropPath
    const runHours = Math.floor(movieData.runtime / 60)
    const runMin = movieData.runtime % 60
    const date = new Date(movieData.releaseDate)
    const releaseDateFormat = format(new Date(date), 'do MMMM yyyy')
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
        <div className="movie-details-container">
          <div>
            <h1 className="movie-h1">Genres</h1>
            <ul>
              {movieData.genres.map(each => (
                <p key={each.name} className="movie-p">
                  {each.name}
                </p>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="movie-h1">Audio Available</h1>
            <ul>
              {movieData.languages.map(each => (
                <p key={each.englishName} className="movie-p">
                  {each.englishName}
                </p>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="movie-h1">Rating Count</h1>
            <p className="movie-p">{movieData.ratingCount}</p>
            <h1 className="movie-h1">Rating Average</h1>
            <p className="movie-p">{movieData.ratingAvg}</p>
          </div>
          <div>
            <h1 className="movie-h1">Budget</h1>
            <p className="movie-p">{movieData.budget}</p>
            <h1 className="movie-h1">Release Date</h1>
            <p className="movie-p">{releaseDateFormat}</p>
          </div>
        </div>
        <div className="slider-container">
          <h1 className="side-head">More like this</h1>
          <ul className="video-list">
            {movieData.similarMovies.map(each => (
              <li key={each.id}>
                <VideoThumbnails key={each.id} videoDetails={each} />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  apiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.loading:
        return (
          <>
            <div className="details-cont">
              <Header />
              <LoadingView />
              <Footer />
            </div>
          </>
        )
      case apiStatusValue.success:
        return this.renderSuccess()
      case apiStatusValue.failure:
        return (
          <>
            <div className="details-cont">
              <Header />
              <FailureView retry={this.getResults} errorImg="big" />
              <Footer />
            </div>
          </>
        )
      default:
        return null
    }
  }

  render() {
    return <>{this.apiStatus()}</>
  }
}

export default MovieDetails
