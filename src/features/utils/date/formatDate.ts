import { isDateTimeField } from './isDateTimeField';
import { renderDateToMoment } from './renderDateToMoment';

export function formatDate(fieldName: string, date: Date | string, format = 'YYYY-MM-DD'): string {
    if (isDateTimeField(fieldName, date)) {
        return renderDateToMoment(date).format(format);
    }
    return '';
}
