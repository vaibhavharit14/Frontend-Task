export const validateTask = (task) => {
  if (!task || typeof task !== 'object') return 'Invalid task data';

  const title = task.title?.trim();
  const description = task.description?.trim();

  if (!title) return 'Title is required';
  if (!description) return 'Description is required';

  return null;
};

export const validateLogin = (email, password) => {
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return 'Email and password are required';
  }

  return null;
};