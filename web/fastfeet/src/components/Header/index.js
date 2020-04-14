import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Container, Content, Profile, LinkContainer } from './styles';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
	const dispatch = useDispatch();
	const location = useLocation();
	const [active, setActive] = useState(location.pathname);

	useEffect(() => {
		setActive(location.pathname);
	}, [location]);

	function handleSignout() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Content>
				<nav active>
					<img src={logo} alt="FastFeet" />
					<LinkContainer
						linkActive={
							active === '/packages' ||
							active === '/new-deliverypackage'
						}
					>
						<Link to="/packages">Encomendas</Link>
					</LinkContainer>

					<LinkContainer
						linkActive={
							active === '/deliveryperson' ||
							active === '/new-deliveryperson'
						}
					>
						<Link to="/deliveryperson">Entregadores</Link>
					</LinkContainer>

					<LinkContainer linkActive={active === '/recipients'}>
						<Link to="/recipients">Destinatários</Link>
					</LinkContainer>

					<LinkContainer linkActive={active === '/problems'}>
						<Link to="/problems">Problemas</Link>
					</LinkContainer>
				</nav>
				<aside>
					<Profile>
						<strong>Admin FastFeet</strong>
						<button
							type="button"
							onClick={() => {
								handleSignout();
							}}
						>
							sair do sistema
						</button>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
