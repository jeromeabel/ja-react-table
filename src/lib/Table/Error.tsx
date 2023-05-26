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
