import { format } from 'date-fns';

const dateFormat = (date) => {
  try {
    return format(new Date(date), 'MMMM d, yyyy');
  } catch {
    return 'n/a';
  }
};

export default dateFormat;
