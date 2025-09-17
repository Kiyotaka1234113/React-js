import React, { useEffect, useState } from 'react';

export default function Timer() {
	const [inputSeconds, setInputSeconds] = useState('');
	const [timeLeft, setTimeLeft] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (!isRunning) return;
		if (timeLeft <= 0) return;

		const id = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(id);
	}, [isRunning, timeLeft]);

	useEffect(() => {
		if (isRunning && timeLeft === 0) {
			setIsRunning(false);
			alert('Время вышло!');
		}
	}, [isRunning, timeLeft]);

	const onChange = (e) => {
		const value = e.target.value;
		if (value === '') {
			setInputSeconds('');
			return;
		}
		const asNumber = Number(value);
		if (Number.isFinite(asNumber) && asNumber >= 0) {
			setInputSeconds(value);
		}
	};

	const onStart = () => {
		const seconds = Number(inputSeconds);
		if (Number.isFinite(seconds) && seconds > 0) {
			setTimeLeft(seconds);
			setIsRunning(true);
		}
	};

	const onStop = () => setIsRunning(false);
	const onReset = () => {
		setIsRunning(false);
		setTimeLeft(0);
		setInputSeconds('');
	};

	const format = (total) => {
		const m = Math.floor(total / 60);
		const s = total % 60;
		return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Таймер обратного отсчёта</h1>
			<label style={styles.label}>Введите количество секунд:</label>
			<input
				type="number"
				min="0"
				value={inputSeconds}
				onChange={onChange}
				disabled={isRunning}
				placeholder="Например: 90"
				style={styles.input}
			/>

			<div style={styles.time}>{format(timeLeft)}</div>

			<div style={styles.buttons}>
				<button
					onClick={onStart}
					disabled={isRunning || !inputSeconds || Number(inputSeconds) <= 0}
					style={{ ...styles.button, ...styles.start, ...(isRunning || !inputSeconds || Number(inputSeconds) <= 0 ? styles.disabled : {}) }}
				>
					Старт
				</button>
				<button onClick={onStop} disabled={!isRunning} style={{ ...styles.button, ...styles.stop, ...(!isRunning ? styles.disabled : {}) }}>Стоп</button>
				<button onClick={onReset} style={{ ...styles.button, ...styles.reset }}>Сброс</button>
			</div>
		</div>
	);
}

const styles = {
	container: {
		maxWidth: '520px',
		margin: '40px',
		padding: '24px',
		background: '#fff',
		borderRadius: '12px',
		boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
		fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
	},
	title: { margin: 0, marginBottom: '16px', color: '#222', textAlign: 'center' },
	label: { display: 'block', marginBottom: '8px', color: '#444' },
	input: { width: '100%', padding: '12px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '8px', outline: 'none' },
	time: { marginTop: '20px', fontSize: '48px', fontWeight: 700, textAlign: 'center', color: '#1f2937', fontFamily: 'monospace' },
	buttons: { marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' },
	button: { padding: '10px 18px', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer' },
	start: { background: '#16a34a' },
	stop: { background: '#dc2626' },
	reset: { background: '#2563eb' },
	disabled: { opacity: 0.6, cursor: 'not-allowed' }
};


