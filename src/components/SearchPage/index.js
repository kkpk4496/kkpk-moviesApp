import {Component} from 'react'
import Header from '../Header'

class SearchPage extends Component {
  state = {givenInput: ''}

  getSearchInput = inputs => {
    this.setState({givenInput: inputs})
  }

  getSearchResults = () => console.log('Search done')

  render() {
    const {givenInput} = this.state
    return (
      <>
        <Header
          getSearchInput={this.getSearchInput}
          getSearchResults={this.getSearchResults}
        />
        <h1>Search</h1>
        <p>{givenInput}</p>
      </>
    )
  }
}
export default SearchPage
