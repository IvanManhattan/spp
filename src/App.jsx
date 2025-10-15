// App.jsx
import React, { useState } from 'react';
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';
import ProjectPage from './pages/ProjectPage'; // Добавляем этот импорт
import './App.css';

function App() {
	const [currentPage, setCurrentPage] = useState('home');
	const [selectedProject, setSelectedProject] = useState(null);

	const handleProjectSelect = (project) => {
		console.log('Project selected:', project); // Для отладки
		setSelectedProject(project);
	};

	const handleBackToList = () => {
		setSelectedProject(null);
	};

	const handleNavigation = (page) => {
		setSelectedProject(null);
		setCurrentPage(page);
	};

	const renderPage = () => {
		console.log('Selected project:', selectedProject); // Для отладки
		console.log('Current page:', currentPage); // Для отладки

		if (selectedProject) {
			return (
				<ProjectPage
					project={selectedProject}
					onBack={handleBackToList}
				/>
			);
		}

		switch (currentPage) {
			case 'projects':
				return <ProjectsPage onProjectSelect={handleProjectSelect} />;
			case 'profile':
				return <ProfilePage />;
			default:
				return <HomePage />;
		}
	};

	return (
		<div className="App">
			<Navigation
				onNavigate={handleNavigation}
				currentPage={currentPage}
			/>
			<main style={{
				padding: '2rem',
				minHeight: 'calc(100vh - 80px)',
				backgroundColor: '#f8f9fa'
			}}>
				{renderPage()}
			</main>
		</div>
	);
}

export default App;