/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DedaultLayout from '../pages/_layouts/default';

export default function RouteWrapper({
	component: Component,
	isPrivate,
	...rest
}) {
	const signed = false;

	if (!signed && isPrivate) {
		return <Redirect to="/" />;
	}

	if (signed && !isPrivate) {
		return <Redirect to="/packages" />;
	}

	const Layout = signed ? DedaultLayout : AuthLayout;

	return (
		<Route
			{...rest}
			render={(props) => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
}

RouteWrapper.propTypes = {
	isPrivate: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
		.isRequired,
};

RouteWrapper.defaultProps = {
	isPrivate: false,
};
