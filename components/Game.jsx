import React, { useState,useEffect,useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";

const initialBoard = Array(9).fill("");
const windowWidth = Dimensions.get("window").width;

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);
 const winnerTextRef = useRef(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a]; // Return the winning player
      }
    }
     if (currentBoard.every((cell) => cell !== "")) {
       return "draw"; // All cells are filled without a winner
     }
    return null; // No winner found
  };

  const handleCellPress = (index) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const newWinner = checkWinner(newBoard);

      if (newWinner) {
        setWinner(newWinner);
        setWinningCombination(
          winningCombinations.find((combination) => {
            const [a, b, c] = combination;
            return (
              newBoard[a] &&
              newBoard[a] === newBoard[b] &&
              newBoard[a] === newBoard[c]
            );
          })
        );
        if (winnerTextRef.current) {
      winnerTextRef.current.bounceIn(800); // Adjust duration as needed
    }
        setCurrentPlayer(null); // Disable further moves
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };
 const getRandomColor = () => {
   const letters = "0123456789ABCDEF";
   let color = "#";
   for (let i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
 };
 const [playerXColor, setPlayerXColor] = useState("");
 const [playerOColor, setPlayerOColor] = useState("");

  useEffect(() => {
    setPlayerXColor(getRandomColor());
    setPlayerOColor(getRandomColor());
  }, []);

  /* const renderCell = (index) => (
    <TouchableOpacity
      style={[
        bodyStyles.cell,
        {
          backgroundColor: winningCombination?.includes(index)
            ? "#2ecc71" // Highlighted color for the winning combination
            : board[index] === "X"
            ? playerXColor
            : board[index] === "O"
            ? playerOColor
            : "white",
        },
      ]}
      onPress={() => handleCellPress(index)}
    >
      <Text style={bodyStyles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
  ); */
const renderCell = (index) => (
  <TouchableOpacity
    style={[
      bodyStyles.cell,
      {
        width: windowWidth / 3, // Divide by the number of columns
        backgroundColor: winningCombination?.includes(index)
          ? "#2ecc71"
          : board[index] === "X"
          ? playerXColor
          : board[index] === "O"
          ? playerOColor
          : "white",
      },
    ]}
    onPress={() => handleCellPress(index)}
  >
    <Text style={bodyStyles.cellText}>{board[index]}</Text>
  </TouchableOpacity>
);
  const renderStatus = () => {
    if (winner) {
      if (winner === "draw") {
        return <Text style={bodyStyles.status}>It's a draw!</Text>;
      } else {
       // return <Text style={bodyStyles.status}>{winner} wins!</Text>;
       return (
         <Animatable.Text
           ref={winnerTextRef}
           animation="bounceIn" // Apply animation to winner text
           style={bodyStyles.status}
         >
           {winner} wins!
         </Animatable.Text>
       );

      }
    } else {
      return (
        <Text style={bodyStyles.status}>Player {currentPlayer}'s turn</Text>
      );
    }
  };
const restartGame = ()=>{
 setBoard(initialBoard);
 setCurrentPlayer("X");
 setWinner(null);
 setWinningCombination([])
};

  return (
    <>
      <View style={bodyStyles.container}>
        {/* <Text style={bodyStyles.header}>Tic-Tac-Toe</Text> */}
        <View style={bodyStyles.board}>
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </View>
        {renderStatus()}
      </View>
      <View style={bodyStyles.restartBtnWrap}>
        <Button
          onPress={restartGame}
          title="Restart Game"
          color="green"
          accessibilityLabel=""
          style={bodyStyles.restartBtn}
        />
      </View>
    </>
  );
};
const bodyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  /* board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  }, */
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cell: {
    height: windowWidth / 3, // Adjust the height based on window width
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 36,
  },
  status: {
    fontSize: 20,
    marginTop: 20,
  },
  restartBtnWrap: {
    marginVertical: 8,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  restartBtn: {
    fontSize: 18, // Adjust the font size
    width: 150, // Adjust the width
    height: 50, // Adjust the height
  },
});
export default Game;
