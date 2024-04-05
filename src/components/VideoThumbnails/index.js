import {Link} from 'react-router-dom'
import './index.css'

const VideoThumbnails = props => {
  const {videoDetails} = props
  const {posterPath, id} = videoDetails

  return (
    <Link to={`/movies/${id}`}>
      <img src={posterPath} alt={id} className="thumbnails" />
    </Link>
  )
}

export default VideoThumbnails
