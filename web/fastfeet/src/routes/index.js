import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import Packages from '../pages/Packages';
import DeliveryPerson from '../pages/DeliveryPerson';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';
import DeliveryPersonEdition from '../pages/DeliveryPerson/DeliveryPersonEdition';
import PackageStore from '../pages/Packages/PackageStore';
import RecipientStore from '../pages/Recipients/RecipientsStore';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />
			<Route path="/packages" isPrivate component={Packages} />
			<Route
				path="/deliveryperson"
				isPrivate
				component={DeliveryPerson}
			/>
			<Route path="/recipients" isPrivate component={Recipients} />
			<Route path="/problems" isPrivate component={Problems} />
			<Route
				path="/new-deliveryperson"
				isPrivate
				component={DeliveryPersonEdition}
			/>
			<Route
				path="/new-deliverypackage"
				isPrivate
				component={PackageStore}
			/>
			<Route path="/new-recipient" isPrivate component={RecipientStore} />
		</Switch>
	);
}
