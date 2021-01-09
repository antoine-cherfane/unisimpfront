import React from 'react';
import { Formik } from 'formik';

import styles from './styles';
import defaultStyles from '../../../config/styles';
import colors from '../../../config/colors';

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => (
				<React.Fragment>
					{children}
				</React.Fragment>
			)}
		</Formik>
	);
}

export default AppForm;