import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import VideoThumbnails from '../VideoThumbnails'
import './index.css'

class SearchPage extends Component {
  state = {givenInput: '', searchResults: []}

  getSearchInput = inputs => {
    this.setState({givenInput: inputs})
  }

  getSearchResults = async () => {
    const {givenInput} = this.state
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
      console.log(fetchedData.results)
      const data = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      this.setState({searchResults: data})
    }
  }

  render() {
    const {givenInput, searchResults} = this.state
    return (
      <div className="search-container">
        <Header
          getSearchInput={this.getSearchInput}
          getSearchResults={this.getSearchResults}
        />
        <ul className="video-list">
          {searchResults.map(each => (
            <li>
              <VideoThumbnails key={each.id} videoDetails={each} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default SearchPage
