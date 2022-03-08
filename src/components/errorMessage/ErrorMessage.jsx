import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <div className="error__block">
      <p className='error__message'>Sorry, but...</p>
      <p className="error__descr"><strong>The server encountered an error with the request while loading data.</strong></p>
    </div>
  )
}

export default ErrorMessage;