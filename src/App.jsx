import React, { useState } from 'react';
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
	const [currentPage, setCurrentPage] = useState('home');

	const renderPage = () => {
		switch (currentPage) {
			case 'projects':
				return <ProjectsPage />;
			case 'profile':
				return <ProfilePage />;
			default:
				return <HomePage />;
		}
	};

	return (
		<div className="App">
			<Navigation onNavigate={setCurrentPage} />
			<main style={{ padding: '2rem' }}>
				{renderPage()}
			</main>
		</div>
	);
}

export default App;