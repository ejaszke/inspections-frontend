import { InspectionTime } from '../times/model/inspectionTime';
import { InspectionConfirmation } from '../../confirmations/model/inspectionConfirmation';

export interface Inspection {
    id?: string;
    city: string;
    street: string;
    street_number: string;
    staircases: string;
    employee: string;
    created_at?: string;
    updated_at?: string;
    times?: InspectionTime[];
    confirmations?: InspectionConfirmation[];
}
