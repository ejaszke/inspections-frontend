import React from 'react';
import { FieldAttributes, useField } from 'formik';
import { CFormGroup, CInput, CInvalidFeedback } from '@coreui/react';

const CFormikInput: React.FC<FieldAttributes<any>> = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <CFormGroup>
            <CInput {...field} {...props} invalid={Boolean(meta.touched && meta.error)} />
            <CInvalidFeedback>{meta.error}</CInvalidFeedback>
        </CFormGroup>
    );
};

export default CFormikInput;
