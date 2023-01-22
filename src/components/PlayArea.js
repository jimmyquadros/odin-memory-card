import React, { useState, useEffect } from 'react';

function PlayArea(props) {
    const [roundScore, setRoundScore] = useState(1);
    const [images, setImages] = useState(props.images);
    const [marked, setMarked] = useState(() => new Array(props.level + 2).fill(false));

    function randomizeImages() {
        const [lvl, mrk] = props.random(images, marked);
        setImages(lvl);
        setMarked(mrk);
    }

    useEffect(() => { randomizeImages() }, [roundScore])
    useEffect(() => { reset() }, [props.level])

    function reset() {
        setImages(props.random(props.images));
        setMarked(new Array(props.level + 2).fill(false));
    }

    function handleClick(index) {
        if (marked[index]) { handleGameOver() }
        else if (roundScore === props.level + 2) { handleLevelUp() }
        else { handleScoreUp(index) }
    }

    function handleGameOver() {
        props.levelUp(1);
        props.scoreNull();
        setRoundScore(1);
        reset();
    }

    function handleLevelUp() {
        props.scoreUp();
        props.levelUp(props.level + 1);
        setRoundScore(1);
    }

    function handleScoreUp(index) {
        setRoundScore(roundScore + 1);
        props.scoreUp();
        const mark = [...marked];
        mark[index] = true;
        setMarked(mark);
    }

    return (
        <div style={{border: '1px solid black'}}>
            <div style={{display: 'block'}}>
                {`roundScore: ${roundScore}`}
            </div>
            <button onClick={() => console.log(marked)}>debug</button>
            <button onClick={() => props.random()}>random</button>
            <div style={{syle: 'block'}}>
                {images.map((img, i) => 
                    <img
                        key={i.toString()}
                        src={img}
                        alt={`dummy-${i}`}
                        onClick={(e) => {
                            handleClick(i)
                        }}
                    />)}
            </div>
        </div>
    );
}

export default PlayArea;