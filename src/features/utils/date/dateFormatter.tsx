import { formatDate } from './formatDate';
import React from 'react';
import { dateFields } from './dateFields';

export function dateFormatter(cell: string, row: any) {
    for (const [key, value] of Object.entries(row)) {
        if (value && dateFields.includes(key)) {
            return <span>{row[key] ? formatDate(key, cell, 'DD-MM-YYYY') : ''}</span>;
        }
    }
    return '';
}
