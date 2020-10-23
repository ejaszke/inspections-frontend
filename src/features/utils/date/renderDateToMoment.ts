import moment from 'moment';

export function renderDateToMoment(value: Date | string) {
    return moment(moment(value).add(moment().utcOffset(), 'minutes'));
}
