import React from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default function Packages() {
	api.get('deliverypackage');
	return <h1>Packages</h1>;
}
