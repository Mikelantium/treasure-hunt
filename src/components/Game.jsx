import React, { useState } from 'react';

import imgXUrl from "../img/x.png"
import imgChestUrl from '../img/chest.png';
import imgSkullUrl from '../img/skull.png';


function Game() {
  const [gameIsOver, setGameIsOver] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [chestCoord, setchestCoord] = useState({ x: 0, y: 0 });
  const [board, setBoard] = useState([]);

  const drawBoard = () => {
    setGameIsOver(false);
    const rows = prompt('Introduce número de filas');
    const cols = prompt('Introduce número de columnas');

    setRandomBoatCoor(rows, cols);

    const newBoard = Array.from({ length: rows }, () => Array.from({ length: cols }, () => imgXUrl));
    setBoard(newBoard);
  };

  const checkShot = (i, j) => {
    if (!gameIsOver) {
      setAttempts(attempts + 1);

      if (chestCoord.x === i && chestCoord.y === j) {
        const newBoard = [...board];
        newBoard[i][j] = imgChestUrl;
        setBoard(newBoard);
        setTimeout(() => {
          alert("Enhorabuena. Has ganado");
          setGameIsOver(true);
        }, 200);
      } else {
        const newBoard = [...board];
        newBoard[i][j] = imgSkullUrl;
        setBoard(newBoard);
      }
    }
  };

  const setRandomBoatCoor = (maxRows, maxCols) => {
    setchestCoord({
      x: Math.floor(Math.random() * maxRows),
      y: Math.floor(Math.random() * maxCols),
    });
  };

  return (
    <div>
      <h1>Intentos: <span data-function="attempts">{attempts}</span></h1>
      <button onClick={drawBoard}>Iniciar Juego</button>
      <table>
        <tbody>
          {board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  <img
                    src={cell}
                    alt="X Marks the spot"
                    onClick={() => checkShot(i, j)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Game;
