import React from 'react';
import Gameboard from './gameboard';
import styles from '../styles/game.module.css';

function Game() {
    return (
        <div className={styles.gameContainer}>
            <Gameboard />
        </div>
    );
    }

export default Game;