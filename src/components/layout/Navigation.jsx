import React from 'react';

const Navigation = ({ onNavigate }) => {
	return (
		<nav style={{
			padding: '1rem',
			borderBottom: '1px solid #ccc',
			marginBottom: '1rem',
			backgroundColor: '#f5f5f5'
		}}>
			<ul style={{
				listStyle: 'none',
				display: 'flex',
				gap: '2rem',
				margin: 0,
				padding: 0
			}}>
				<li>
					<button
						onClick={() => onNavigate('home')}
						style={{
							background: 'none',
							color: 'blue',
							border: '1px solid #007bff',
							padding: '0.5rem 1rem',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Главная
					</button>
				</li>
				<li>
					<button
						onClick={() => onNavigate('projects')}
						style={{
							background: 'none',
							color: 'blue',
							border: '1px solid #007bff',
							padding: '0.5rem 1rem',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Проекты
					</button>
				</li>
				<li>
					<button
						onClick={() => onNavigate('profile')}
						style={{
							background: 'none',
							color: 'blue',
							border: '1px solid #007bff',
							padding: '0.5rem 1rem',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Профиль
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;