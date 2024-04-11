import './index.css'

const FailureView = props => {
  const {retry, errorImg} = props
  const onClickRetry = () => retry()
  return (
    <div className="load">
      <img
        src={
          errorImg === 'big'
            ? 'https://res.cloudinary.com/dzo0il2vd/image/upload/v1712326966/went_wrong_jjqk6h.png'
            : 'https://res.cloudinary.com/dzo0il2vd/image/upload/v1709744586/alert-triangle_znbwiq.png'
        }
        alt="failure view"
      />
      <p className="failure-head">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
