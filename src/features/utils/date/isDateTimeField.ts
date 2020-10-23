import moment from 'moment';
import { dateFields } from './dateFields';

export function isDateTimeField(field: string, value: any): boolean {
    return moment.isMoment(value) || (dateFields.includes(field) && value);
}
