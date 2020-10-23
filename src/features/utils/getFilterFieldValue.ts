interface Filters {
    [key: string]: {
        filterVal: any;
        filterType: 'TEXT';
        comparator: any;
    };
}

export function getFilterFieldValue(fieldName: string, filters: Filters): string {
    for (const [key, value] of Object.entries(filters)) {
        if (value && key === fieldName) {
            return value.filterVal;
        }
    }
    return '';
}
