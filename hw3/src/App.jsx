import React from 'react';
import Timer from './Timer.jsx';

export default function App() {
	return (
		<div className="App" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#667eea,#764ba2)' }}>
			<Timer />
		</div>
	);
}


