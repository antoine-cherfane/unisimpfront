import React from 'react';

import { useFormikContext } from 'formik';

import styles from './styles';
import defaultStyles from '../../../config/styles';
import colors from '../../../config/colors';
import AppTextInput from '../../AppTextInput';
import ErrorMessage from '../ErrorMessage';

function AppFormField({ name, width, submitted, ...otherProps }) {

	const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

	return (
		<React.Fragment>
			<AppTextInput
				onBlur={() => setFieldTouched(name)}
				onChangeText={handleChange(name)}
				width={width}
				{...otherProps}
			/>
			<ErrorMessage 
				error={errors[name]}
				visible={touched[name]}
			/>
		</React.Fragment>
	);
}

export default AppFormField;