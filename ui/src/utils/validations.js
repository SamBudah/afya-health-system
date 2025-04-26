export const programValidation = ({ name, description }) => {
    const errors = {};
    if (!name.trim()) errors.name = 'Program name is required';
    if (name.length > 50) errors.name = 'Name must be 50 characters or less';
    if (description.length > 500) errors.description = 'Description must be 500 characters or less';
    return errors;
  };