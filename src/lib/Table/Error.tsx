/**
 *
 * @component
 * @name Error
 * @description Represents an error or warning message component.
 * @param {Object} props - The component props.
 * @param {string} props.message - The error or warning message to be displayed.
 * @param {string} [props.type='error'] - The type of the error or warning (default: 'error').
 * @returns {JSX.Element} The rendered Error component.
 */

const Error = ({
  message,
  type = 'error',
}: {
  message: string;
  type?: string;
}) => {
  type ErrorTypeToClassMap = {
    [key: string]: string;
  };

  const errorTypeToClassMap: ErrorTypeToClassMap = {
    error: 'text-red-500',
    warning: 'text-orange-500',
  };

  const typeClass = errorTypeToClassMap[type] || '';

  return (
    <div className={`animate-pulse ${typeClass}`}>
      <h1 className="text-2xl">⚠️</h1>
      <p>{message}</p>
    </div>
  );
};

export default Error;
