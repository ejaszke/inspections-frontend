import { destroy, post, put } from './base';
import { ApiResources } from './apiResources';
import { InspectionTime } from '../features/inspections/times/model/inspectionTime';

export const InspectionTimeApi = {
    fetchRegisterInspectionTime: (inspectionId: string, inspectionTime: InspectionTime) =>
        post(`${ApiResources.inspections}/${inspectionId}/times`, inspectionTime),
    fetchEditInspectionTime: (inspectionId: string, inspectionTimeId: string, inspectionTime: InspectionTime) =>
        put(`${ApiResources.inspections}/${inspectionId}/times/${inspectionTimeId}`, inspectionTime),
    fetchDeleteInspectionTime: (inspectionId: string, inspectionTimeId: string) =>
        destroy(`${ApiResources.inspections}/${inspectionId}/times/${inspectionTimeId}`),
};
