export interface InspectionConfirmation {
	id?: string;
	inspection_id?: string;
	answer: string;
	additional_notes?: string;
	created_at?: Date | string;
}
