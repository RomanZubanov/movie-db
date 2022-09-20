import { format } from 'date-fns';

const dateFormat = (date) => format(new Date(date), 'MMMM d, yyyy');

export default dateFormat;
