import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);   
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isActive, setIsActive] = useState(false); 

  useEffect(() => {
    let timer = null;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      alert("⏰ Время вышло!");
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    if (seconds > 0) {
      setTimeLeft(seconds);
      setIsActive(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>⏳ Таймер обратного отсчёта</h2>

      <input
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(Number(e.target.value))}
        placeholder="Введите секунды"
      />
      <button onClick={handleStart} style={{ marginLeft: "10px" }}>
        Старт
      </button>

      <h3>Осталось: {timeLeft} секунд</h3>
    </div>
  );
}
