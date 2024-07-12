<?php
session_start();

// Allow requests from the frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

// Function to initialize the game and reset the game state, whilst keeping the leaderboard
function initializeGame() {
    $leaderboard = $_SESSION['game_state']['leaderboard'];

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
        'leaderboard' => [
            1 => 0,
            2 => 0,
            3 => 0,
            4 => 0,
            5 => 0,
            6 => 0,
            7 => 0,
            8 => 0,
            9 => 0,
            10 => 0
        ],
        'bonusScore' => null,
        'totalScore' => null,
        'welcomeHasShown' => true
    ];

    if (isset($leaderboard)) {
        $_SESSION['game_state']['leaderboard'] = $leaderboard;
    }
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

// Function to update the leaderboard when the game ends
function updateLeaderboard($totalScore) {
    $leaderboard = $_SESSION['game_state']['leaderboard'];

    foreach ($leaderboard as $key => $value) {
        if ($totalScore > $value) {
            $temp = $value;
            $leaderboard[$key] = $totalScore;
            $totalScore = $temp;
        }
    }

    $_SESSION['game_state']['leaderboard'] = $leaderboard;
}

// Function to end the game and show the total score
function endGame($totalScore) {
    initializeGame();
    $_SESSION['game_state']['totalScore'] = $totalScore;
    $_SESSION['game_state']['welcomeHasShown'] = false;
    updateLeaderboard($totalScore);
}

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



/* Scoring functions */

// Adds the sum of all ones
function ones($dices = [0, 0, 0, 0, 0]) {
    return count(array_filter($dices, function($dice) {
        return $dice === 1;
    }));
}

// Adds the sum of all twos
function twos($dices = [0, 0, 0, 0, 0]) {
    return count(array_filter($dices, function($dice) {
        return $dice === 2;
    })) * 2;
}

// Adds the sum of all threes
function threes($dices = [0, 0, 0, 0, 0]) {
    return count(array_filter($dices, function($dice) {
        return $dice === 3;
    })) * 3;
}

// Adds the sum of all fours
function fours($dices = [0, 0, 0, 0, 0]) {
    return count(array_filter($dices, function($dice) {
        return $dice === 4;
    })) * 4;
}

// Adds the sum of all fives
function fives($dices = [0, 0, 0, 0, 0]) {
    return count(array_filter($dices, function($dice) {
        return $dice === 5;
    })) * 5;
}

// Adds the sum of all sixes
function sixes($dices = [0, 0, 0, 0, 0]) {
    return count(array_filter($dices, function($dice) {
        return $dice === 6;
    })) * 6;
}

// Adds the sum of the highest pair
function onePair($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);
    $max = 0;

    foreach ($counts as $key => $count) {
        if ($count >= 2) {
            $max = max($max, $key);
        }
    }

    return $max * 2;
}

// Adds the sum of the two pairs
function twoPairs($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);
    $sum = 0;
    $pairs = 0;

    foreach ($counts as $key => $count) {
        if ($count >= 2) {
            $sum += $key * 2;
            $pairs++;
        }
    }

    return $pairs === 2 ? $sum : 0;
}

// Adds the sum of the three of a kind
function threeOfAKind($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);

    foreach ($counts as $key => $count) {
        if ($count >= 3) {
            return $key * 3;
        }
    }

    return 0;
}

// Adds the sum of the four of a kind
function fourOfAKind($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);

    foreach ($counts as $key => $count) {
        if ($count >= 4) {
            return $key * 4;
        }
    }

    return 0;
}

// Adds 15 if the dices are a small straight (1, 2, 3, 4, 5)
function smallStraight($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);

    if (isset($counts[1]) && isset($counts[2]) && isset($counts[3]) && isset($counts[4]) && isset($counts[5])) {
        return 15;
    }

    return 0;
}

// Adds 15 if the dices are a large straight (2, 3, 4, 5, 6)
function largeStraight($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);

    if (isset($counts[2]) && isset($counts[3]) && isset($counts[4]) && isset($counts[5]) && isset($counts[6])) {
        return 15;
    }

    return 0;
}

// Adds the sum of the full house (three of a kind and a pair)
function fullHouse($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);
    $values = array_values($counts);

    if (count($values) === 2 && in_array(3, $values) && in_array(2, $values)) {
        return array_sum($dices);
    }

    return 0;
}

// Adds the sum of all dices
function chance($dices = [0, 0, 0, 0, 0]) {
    return array_sum($dices);
}

// Adds 50 if all dices are the same
function yatzy($dices = [0, 0, 0, 0, 0]) {
    $counts = array_count_values($dices);

    if (count($counts) === 1 && isset($dices[0]) && $counts[$dices[0]] === 5) {
        return 50;
    }

    return 0;
}

// Function to calculate the bonus
function bonus($scores) {
    $sum = $scores['Ones'][0] + $scores['Twos'][0] + $scores['Threes'][0] + $scores['Fours'][0] + $scores['Fives'][0] + $scores['Sixes'][0];
    return $sum >= 63 ? 50 : 0;
}

/* End of scoring functions */



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
