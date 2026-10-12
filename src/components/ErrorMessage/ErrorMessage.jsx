import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>❌ {message || 'Ocurrió un error al cargar los datos'}</p>
    </div>
  );
};

export default ErrorMessage;