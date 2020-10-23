import React from 'react';
import { FieldAttributes, useField } from 'formik';
import { CFormGroup, CInvalidFeedback, CSelect } from '@coreui/react';

const CFormikSelect: React.FC<FieldAttributes<any>> = ({ ...props }) => {
    const [field, meta] = useField(props);

    return (
        <CFormGroup>
            <CSelect {...field} {...props} invalid={Boolean(meta.touched && meta.error)} />
            <CInvalidFeedback>{meta.error}</CInvalidFeedback>
        </CFormGroup>
    );
};

export default CFormikSelect;
