# Yatzy CSI 3140

## Overview

Welcome to the Single Player Yatzy Game! This web-based game brings the classic dice game Yatzy to the browser. Play through multiple rounds, roll the dice, and try to get the best scores in various categories. This README provides an overview of the game rules, features, and the implementation details of the website.

## How to Play

### Objective

The objective of Yatzy is to score the most points by rolling five dice and making specific combinations. The player (i.e you) roll the dice and choose the best combinations to score in different categories.

### Rules

1. **Rolls per Turn**: The player gets up to three rolls per turn.
2. **Dice Keeping**: After each roll, the player can choose to keep or re-roll any combination of the five dice.
3. **Scoring Categories**: At the end of each turn, the player must select one of the scoring categories for that turn. Selected categories are displayed as dark blue, whereas categories that can be chosen are light green. Each category can be used only once. If all possible categories are empty, the player must still select one, which will be marked as zero.
4. **End of Game**: The game ends after 15 rounds when all categories have been filled.

### Scoring Categories

- **Upper Section**:
  - Ones, Twos, Threes, Fours, Fives, Sixes: Sum of the dice showing the specified number.
- **Lower Section**:
  - Three of a Kind: Sum of the 3 dices which are the same.
  - Four of a Kind: Sum of the four dice which are the same.
  - Full House: Sum of all the dice if there is a combination of three of a kind and a pair.
  - Small Straight: 15 points for a sequence of 1-2-3-4-5
  - Large Straight: 15 points for a sequence of 2-3-4-5-6
  - Chance: Sum of all dice, regardless of combination.
  - Yatzy: 50 points for five of a kind.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)

### Installation

1. Clone the repository:

```bash
  git clone https://github.com/Mohamad-Kassas/yatzy.git
  cd yatzy
```

2. Install dependencies:

```bash
  npm install
```

3. Start the development server:

```bash
  npm start
```

5. Open your browser and navigate to http://localhost:3000 to play the game.

## Features

- **User-Friendly Interface**: Intuitive design for easy gameplay.
- **Responsive Design**: Adapts to different screen sizes for a smooth experience on any desktop/laptop of the user's choice.
- **Score Tracking**: Automatically calculates and updates scores for each category.

## Implementation

### Technology Stack

HTML, CSS, JavaScript (React.js)

### React Components

The website is built using React components. Each component represents a specific part of the game, and they are combined to form the full page.

1. **Game Component**

   - Manages the overall game state and logic.
   - Renders the game board, score table, and controls.

2. **ScoreBoard Component**

   - Displays the current scores in each category.
   - Allows user to select categories and see their current score.

3. **GameBoard Component**

   - Renders the five dice and handles the rolling.
   - Allows user to keep or re-roll dice.
   - Provides buttons for rolling dice
   - Displays the number of rolls left.

These components work together to provide a seamless and interactive user experience. The Game component serves as the main container that combines all other components, ensuring that the game state is managed efficiently and that user interactions are handled properly.

### Design System

This repository documents the design system for the Yatzy game website.

[Design System](./src/docs/design_system.md)

### State Management

The game state is managed using React's `useState` and `useEffect` hooks. Some key state variables include:

- `dices`: An array representing the current values of the five dice.
- `keep`: An array of booleans indicating which dice are kept.
- `rollsLeft`: The number of rolls left in the current turn.
- `scores`: An object tracking the scores for each category.

### Examples of various states of the game:

<br>

- Game Not Started (Welcome Screen)
  <img width="1667" alt="Screen Shot 2024-06-08 at 4 42 30 PM" src="https://github.com/Mohamad-Kassas/yatzy/assets/113208914/4f5e102b-d328-4ae0-93e9-59b7c4231b45">
  <br>
  <br>
  <br>
  <br>

- During Game
  <img width="1668" alt="Screen Shot 2024-06-08 at 4 55 08 PM" src="https://github.com/Mohamad-Kassas/yatzy/assets/113208914/7200b75b-37ef-4792-8973-8ae29d2bbe0e">
  <br>
  <br>
  <br>
  <br>

- End of Game
  <img width="1660" alt="Screen Shot 2024-06-08 at 4 57 04 PM" src="https://github.com/Mohamad-Kassas/yatzy/assets/113208914/658a77f6-04d1-45eb-9704-1f96a6561a53">
  <br>
  <br>

### Collaborators

#### Group 41: Mohamad Kassas and Anjali Mohammed
