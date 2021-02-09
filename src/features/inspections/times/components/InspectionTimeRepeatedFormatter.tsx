import React from 'react';
import { CBadge } from '@coreui/react';
import { InspectionTime } from '../model/inspectionTime';

export function InspectionTimeRepeatedFormatter(cell: string, row: InspectionTime) {
    return <h4>{row.is_repeated ? <CBadge color="success">Tak</CBadge> : <CBadge color="info">Nie</CBadge>}</h4>;
}
