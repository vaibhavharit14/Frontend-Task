export const parseApiError = (error) => {
  if (!error || typeof error !== 'object') return 'Unexpected error occurred';

  if (error.response?.data?.message) return error.response.data.message;

  if (Array.isArray(error.response?.data?.errors)) {
    return error.response.data.errors[0]?.msg || 'Validation failed';
  }

 if (error.code === 'ERR_NETWORK') return 'Network error. Please check your connection.';

  if (error.message) return error.message;

  return 'Something went wrong';
};