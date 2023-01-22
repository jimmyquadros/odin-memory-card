import React, { useState, useEffect } from 'react';
import PlayArea from './components/PlayArea';

function App() {

  const [images, setImages] = useState(() => importAll(require.context('./components/img', false, /\.(png)$/)));
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);

  useEffect(() => { if (score > hiScore) setHiScore(score); })

  // import all images at once
  function importAll(r) {
    let images = [];
    r.keys().forEach((item) => { images.push(r(item)) });
    return images;
  }

  // return a randomized array, optional second parameter randomizes second array in lockstep
  function randomizeArray(original, lock) {
    const newArray = [];
    const newLock = [];
    const size = original.length;
    for (let i = 0; i < size; i++) {
      let random = Math.floor(Math.random() * size)
      while (newArray[random]) {
        random += 1;
        if (random === size) random = 0;
      }
      newArray[random] = original[i];
      if (lock) newLock[random] = lock[i];
    }
    if (lock) return [newArray, newLock]
    return newArray;
  }

  return (
    <div className="App">
      <div style={{ display: 'block'}}>
        {`SCORE: ${score} LEVEL: ${level} HISCORE: ${hiScore}`}
      </div>
      <div style={{ display: 'block' }}>
        <button onClick={() => setImages(randomizeArray(images))} >RANDOMIZE</button>
        <button onClick={() => setLevel(level + 1)}>GROW</button>
        <button onClick={() => setLevel(1)}>RESET</button>
      </div>
      <div style={{display: 'block'}}>
        <img src={images[0]} alt='TOPLEVEL IMG' />
        <img src={images[1]} alt='TOPLEVEL IMG' />
        <img src={images[2]} alt='TOPLEVEL IMG' />
      </div>
      <div>
        <PlayArea 
        images={images.slice(0, level + 2)} 
        level={level}
        levelUp={setLevel}
        random={randomizeArray} 
        scoreUp={() => setScore(score + 1)}
        scoreNull={() => setScore(0)}
        />
      </div>
    </div>
  );
}

export default App;
