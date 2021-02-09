export interface InspectionTime {
    id?: string;
    date: string;
    start_time: Date | string;
    end_time: Date | string;
    is_repeated: boolean;
    apartment_notes?: string;
}
