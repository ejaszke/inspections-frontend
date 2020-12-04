import { InspectionTime } from '../times/model/inspectionTime';
import { Confirmation } from '../../confirmations/model/confirmation';

export interface Inspection {
    id?: string;
    city: string;
    street: string;
    street_number: string;
    staircases: string;
    created_at?: string;
    updated_at?: string;
    times?: InspectionTime[];
    confirmations?: Confirmation[];
}
