import Loader from 'react-loader-spinner'
import './index.css'

const LoadingView = () => (
  <div className="loader-container load" testid="loader">
    <Loader type="TailSpin" color="#D81F26" height={75} width={75} />
  </div>
)

export default LoadingView
