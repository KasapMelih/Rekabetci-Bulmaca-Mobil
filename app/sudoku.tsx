import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const easyPuzzle: (string | null)[][] = [
  ["5", "3", null, null, "7", null, null, null, null],
  ["6", null, null, "1", "9", "5", null, null, null],
  [null, "9", "8", null, null, null, null, "6", null],

  ["8", null, null, null, "6", null, null, null, "3"],
  ["4", null, null, "8", null, "3", null, null, "1"],
  ["7", null, null, null, "2", null, null, null, "6"],

  [null, "6", null, null, null, null, "2", "8", null],
  [null, null, null, "4", "1", "9", null, null, "5"],
  [null, null, null, null, "8", null, null, "7", "9"],
];

const mediumPuzzle: (string | null)[][] = [
  [null, null, "3", null, "2", null, "6", null, null],
  ["9", null, null, "3", null, "5", null, null, "1"],
  [null, null, "1", "8", null, "6", "4", null, null],

  [null, null, "8", "1", null, "2", "9", null, null],
  ["7", null, null, null, null, null, null, null, "8"],
  [null, null, "6", "7", null, "8", "2", null, null],

  [null, null, "2", "6", null, "9", "5", null, null],
  ["8", null, null, "2", null, "3", null, null, "9"],
  [null, null, "5", null, "1", null, "3", null, null],
];

const hardPuzzle: (string | null)[][] = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, "3", null, "8", "5"],
  [null, null, "1", null, "2", null, null, null, null],

  [null, null, null, "5", null, "7", null, null, null],
  [null, null, "4", null, null, null, "1", null, null],
  [null, "9", null, null, null, null, null, null, null],

  ["5", null, null, null, null, null, null, "7", "3"],
  [null, null, "2", null, "1", null, null, null, null],
  [null, null, null, null, "4", null, null, null, "9"],
];

const Sudoku = () => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [puzzle, setPuzzle] = useState<(string | null)[][]>([]);
  const [board, setBoard] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (difficulty) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [difficulty]);

  const startGame = (level: string) => {
    let chosen;
    if (level === "kolay") chosen = easyPuzzle;
    else if (level === "normal") chosen = mediumPuzzle;
    else chosen = hardPuzzle;
    setDifficulty(level);
    setPuzzle(chosen);
    setBoard(chosen.map((row) => row.map((cell) => cell || "")));
    setTime(0);
    setSelectedNumber("");
    setSelectedCell(null);
  };

  const handleCellPress = (row: number, col: number) => {
    if (puzzle[row][col]) return;
    setSelectedCell([row, col]);
    if (selectedNumber !== "") {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = selectedNumber;
      setBoard(newBoard);
    }
  };

  const isValid = (row: number, col: number): boolean => {
    const value = board[row][col];
    if (!value) return true;
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === value) return false;
      if (i !== row && board[i][col] === value) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const r = boxRow + i;
        const c = boxCol + j;
        if ((r !== row || c !== col) && board[r][c] === value) return false;
      }
    }
    return true;
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => {
          const isOriginal = puzzle[rowIndex][colIndex] !== null;
          const isSelected =
            selectedCell &&
            selectedCell[0] === rowIndex &&
            selectedCell[1] === colIndex;
          const invalid = !isOriginal && cell && !isValid(rowIndex, colIndex);

          return (
            <TouchableOpacity
              key={colIndex}
              style={[
                styles.cell,
                isSelected && styles.selectedCell,
                (colIndex + 1) % 3 === 0 && colIndex !== 8
                  ? styles.rightBorder
                  : {},
                (rowIndex + 1) % 3 === 0 && rowIndex !== 8
                  ? styles.bottomBorder
                  : {},
              ]}
              onPress={() => handleCellPress(rowIndex, colIndex)}
            >
              <Text
                style={{
                  color: isOriginal ? "black" : invalid ? "red" : "blue",
                  fontSize: 18,
                  fontWeight: isOriginal ? "bold" : "normal",
                }}
              >
                {cell}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  const renderNumberPad = () => {
    return (
      <View style={styles.numberPad}>
        {Array.from({ length: 9 }, (_, i) => `${i + 1}`).map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberButton,
              selectedNumber === num && styles.selectedNumber,
            ]}
            onPress={() => setSelectedNumber(num)}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSelectedNumber("")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sil</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!difficulty) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Zorluk Seç
        </Text>
        <TouchableOpacity
          onPress={() => startGame("kolay")}
          style={styles.numberButton}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Kolay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => startGame("normal")}
          style={styles.numberButton}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => startGame("zor")}
          style={styles.numberButton}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Zor</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Sudoku - {difficulty.toUpperCase()}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Süre: {time} saniye
      </Text>
      <View style={styles.board}>{renderBoard()}</View>
      {renderNumberPad()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  board: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCell: {
    backgroundColor: "#cce6ff",
  },
  rightBorder: {
    borderRightWidth: 3,
  },
  bottomBorder: {
    borderBottomWidth: 3,
  },
  numberPad: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  numberButton: {
    backgroundColor: "#007AFF",
    width: 80,
    height: 40,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  selectedNumber: {
    backgroundColor: "#0051a8",
  },
  clearButton: {
    backgroundColor: "#999",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default Sudoku;
