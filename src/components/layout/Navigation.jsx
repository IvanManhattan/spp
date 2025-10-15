// components/layout/Navigation.jsx
import React from 'react';

const Navigation = ({ onNavigate, currentPage }) => {
	const navItems = [
		{ key: 'home', label: 'Главная' },
		{ key: 'projects', label: 'Проекты' },
		{ key: 'profile', label: 'Профиль' }
	];

	return (
		<nav style={{
			backgroundColor: '#343a40',
			padding: '1rem 2rem',
			boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
		}}>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				maxWidth: '1200px',
				margin: '0 auto'
			}}>
				{/* Логотип */}
				<div style={{
					color: 'white',
					fontSize: '1.5rem',
					fontWeight: 'bold',
					cursor: 'pointer'
				}}
					onClick={() => onNavigate('home')}
				>
					TaskManager
				</div>

				{/* Навигация */}
				<div style={{ display: 'flex', gap: '2rem' }}>
					{navItems.map(item => (
						<button
							key={item.key}
							onClick={() => onNavigate(item.key)}
							style={{
								background: 'none',
								border: 'none',
								color: currentPage === item.key ? '#007bff' : 'white',
								cursor: 'pointer',
								fontSize: '1rem',
								fontWeight: currentPage === item.key ? '600' : '400',
								padding: '0.5rem 1rem',
								borderRadius: '4px',
								transition: 'all 0.2s ease'
							}}
							onMouseEnter={(e) => {
								if (currentPage !== item.key) {
									e.currentTarget.style.backgroundColor = '#495057';
								}
							}}
							onMouseLeave={(e) => {
								if (currentPage !== item.key) {
									e.currentTarget.style.backgroundColor = 'transparent';
								}
							}}
						>
							{item.label}
						</button>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;