<?php
session_start();

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

// Function to initialize the game and reset the game state
function initializeGame() {
    $_SESSION['game_state'] = [
        'dices' => [0, 0, 0, 0, 0],
        'keep' => [false, false, false, false, false],
        'rollsLeft' => 3,
        'scores' => [
            'Ones' => [null, 0, 'ones'],
            'Twos' => [null, 0, 'twos'],
            'Threes' => [null, 0, 'threes'],
            'Fours' => [null, 0, 'fours'],
            'Fives' => [null, 0, 'fives'],
            'Sixes' => [null, 0, 'sixes'],
            'One Pair' => [null, 0, 'onePair'],
            'Two Pairs' => [null, 0, 'twoPairs'],
            'Three of a Kind' => [null, 0, 'threeOfAKind'],
            'Four of a Kind' => [null, 0, 'fourOfAKind'],
            'Small Straight' => [null, 0, 'smallStraight'],
            'Large Straight' => [null, 0, 'largeStraight'],
            'Full House' => [null, 0, 'fullHouse'],
            'Chance' => [null, 0, 'chance'],
            'Yatzy' => [null, 0, 'yatzy']
        ],
        'bonusScore' => null,
        'totalScore' => null,
        'welcomeHasShown' => true
    ];
}

// Function to start the game, by initializing the state and rolling the dices for the first time
function startGame() {
    initializeGame();
    return rollDice();
}

// Function to roll the dices and compute the corresponding scores
function rollDice() {
    if ($_SESSION['game_state']['rollsLeft'] === 0) {
        return $_SESSION['game_state'];
    }
    $_SESSION['game_state']['dices'] = array_map(function($dice, $keep) {
        return $keep ? $dice : rand(1, 6);
    }, $_SESSION['game_state']['dices'], $_SESSION['game_state']['keep']);

    $_SESSION['game_state']['rollsLeft']--;

    computeScores();

    return $_SESSION['game_state'];
}

// Function to lock and unlock dices
function toggleKeep($index) {
    $_SESSION['game_state']['keep'][$index] = !$_SESSION['game_state']['keep'][$index];
    return $_SESSION['game_state'];
}

// Function to compute the scores of the dices
function computeScores() {
    $dices = $_SESSION['game_state']['dices'];
    $scores = $_SESSION['game_state']['scores'];

    foreach ($scores as $key => $value) {
        $functionName = $value[2];
        $_SESSION['game_state']['scores'][$key][1] = $functionName($dices);
    }

    checkBonus($_SESSION['game_state']['scores']);

    checkTotalScore($_SESSION['game_state']['scores']);

    return $_SESSION['game_state'];
}

// Function to check if the bonus should be added
function checkBonus($scores) {
    if (
        $scores['Ones'][0] !== null &&
        $scores['Twos'][0] !== null &&
        $scores['Threes'][0] !== null &&
        $scores['Fours'][0] !== null &&
        $scores['Fives'][0] !== null &&
        $scores['Sixes'][0] !== null
    ) {
        $_SESSION['game_state']['bonusScore'] = bonus($_SESSION['game_state']['scores']);
    }
}

// Function to check if the total score should be calculated, and ending the game if so
function checkTotalScore($scores) {
    foreach ($scores as $value) {
        if ($value[0] === null) {
            return;
        }
    }

    $_SESSION['game_state']['totalScore'] = array_reduce($scores, function($acc, $score) {
        return $acc + $score[0];
    }, 0) + $_SESSION['game_state']['bonusScore'];

    endGame($_SESSION['game_state']['totalScore']);
}

// Function to end the game and show the total score
function endGame($totalScore) {
    initializeGame();
    $_SESSION['game_state']['totalScore'] = $totalScore;
    $_SESSION['game_state']['welcomeHasShown'] = false;}

// Function to reset the turn
function resetTurnFunction() {
    $_SESSION['game_state']['keep'] = [false, false, false, false, false];
    $_SESSION['game_state']['rollsLeft'] = 3;
    return rollDice();
}

// Function to handle the click on the score buttons
function handleClick($key) {
    if ($_SESSION['game_state']['scores'][$key][0]) {
        return $_SESSION['game_state'];
    }

    $newScores = $_SESSION['game_state']['scores'];
    $finalScore = $_SESSION['game_state']['scores'][$key][2]($_SESSION['game_state']['dices']);

    $newScores[$key] = [
    $finalScore,
    $_SESSION['game_state']['scores'][$key][1],
    $_SESSION['game_state']['scores'][$key][2]
    ];

    $_SESSION['game_state']['scores'] = $newScores;
    return resetTurnFunction();
}



/* Main logic */
// Fetching the action, the index and the key from the GET request
$action = $_GET['action'];
$index = isset($_GET['index']) ? intval($_GET['index']) : null;
$key = isset($_GET['key']) ? $_GET['key'] : null;

// Performing the requested action
switch ($action) {
    case 'roll':
        $result = rollDice();
        break;
    case 'toggleKeep':
        $result = toggleKeep($index);
        break;
    case 'start':
        $result = startGame();
        break;
    case 'handleClick':
        $result = handleClick($key);
        break;
    default:
        $result = ['error' => 'Invalid action'];
}

// Returning a JSON response
header('Content-Type: application/json');
echo json_encode($result);
