import { get, post, put, destroy } from './base';
import { ApiResources } from './apiResources';
import { Inspection } from '../features/inspections/model/inspection';
import { AxiosPromise } from 'axios';
import { InspectionConfirmation } from '../features/confirmations/model/inspectionConfirmation';

export const InspectionApi = {
    fetchInspections: (): AxiosPromise<Inspection[]> => get(ApiResources.inspections),
    fetchRegisterInspection: (inspection: Inspection) => post(ApiResources.inspections, inspection),
    fetchInspectionById: (id: string) => get(`${ApiResources.inspections}/${id}`),
    fetchEditInspection: (id: string, inspection: Inspection) => put(`${ApiResources.inspections}/${id}`, inspection),
    fetchDeleteInspection: (id: string) => destroy(`${ApiResources.inspections}/${id}`),
    fetchRegisterInspectionConfirmation: (id: string, inspectionConfirmation: InspectionConfirmation) =>
        post(`${ApiResources.inspections}/${id}/confirmations`, inspectionConfirmation),
};
