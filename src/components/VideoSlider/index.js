import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import VideoThumbnails from '../VideoThumbnails'
import './index.css'

const VideoSlider = props => {
  const {videoList} = props
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  return (
    <div className="slider">
      <Slider {...settings}>
        {videoList.map(each => (
          <VideoThumbnails key={each.id} videoDetails={each} />
        ))}
      </Slider>
    </div>
  )
}

export default VideoSlider
