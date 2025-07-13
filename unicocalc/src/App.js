import React, { useState } from "react";
import "./App.css";

function pad(num) {
  return num.toString().padStart(2, "0");
}

function addTime(hour, minute, addHour, addMinute) {
  let totalMinutes = hour * 60 + minute + addHour * 60 + addMinute;
  totalMinutes = ((totalMinutes % 1440) + 1440) % 1440; // 24시간 기준
  const newHour = Math.floor(totalMinutes / 60);
  const newMinute = totalMinutes % 60;
  return { hour: newHour, minute: newMinute };
}

function App() {
  const now = new Date();
  const [hour, setHour] = useState(now.getHours());
  const [minute, setMinute] = useState(now.getMinutes());
  const [addHour, setAddHour] = useState(0);
  const [addMinute, setAddMinute] = useState(0);
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    const res = addTime(Number(hour), Number(minute), Number(addHour), Number(addMinute));
    setResult(res);
  };

  return (
    <div className="container">
      <img src="/unico.jpg" alt="유니코" className="unico-img" />
      <h1>유니코 시간 계산기</h1>
      <div className="input-group">
        <label>
          현재 시각
          <input
            type="number"
            min="0"
            max="23"
            value={hour}
            onChange={e => setHour(e.target.value)}
            aria-label="현재 시"
          />
          :
          <input
            type="number"
            min="0"
            max="59"
            value={minute}
            onChange={e => setMinute(e.target.value)}
            aria-label="현재 분"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          더할 시간
          <input
            type="number"
            min="0"
            max="23"
            value={addHour}
            onChange={e => setAddHour(e.target.value)}
            aria-label="더할 시"
          />
          시
          <input
            type="number"
            min="0"
            max="59"
            value={addMinute}
            onChange={e => setAddMinute(e.target.value)}
            aria-label="더할 분"
          />
          분
        </label>
      </div>
      <button className="calc-btn" onClick={handleCalc}>
        계산하기
      </button>
      {result && (
        <div className="result">
          <span>결과: </span>
          <span className="result-time">
            {pad(result.hour)}:{pad(result.minute)}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;