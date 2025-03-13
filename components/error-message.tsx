const ErrorMessages = ({errors}: {errors: any}) => {
  return <p className='text-red-600 text-sm'>{errors}</p>;
};

export default ErrorMessages;
