import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

function getDifficultySettings(difficulty: string) {
  if (difficulty === "kolay") {
    return { rows: 9, cols: 9, mines: 10 };
  } else if (difficulty === "normal") {
    return { rows: 8, cols: 8, mines: 10 };
  } else if (difficulty === "zor") {
    return { rows: 12, cols: 12, mines: 30 };
  }
  return { rows: 9, cols: 9, mines: 10 };
}

const createBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      minesPlaced++;
    }
  }
  boardCalculateAdjacency(board);
  return board;
};

function boardCalculateAdjacency(board: Cell[][]) {
  const rows = board.length;
  const cols = board[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].isMine) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = r + i;
            const nc = c + j;
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              board[nr][nc].isMine
            ) {
              count++;
            }
          }
        }
        board[r][c].adjacentMines = count;
      } else {
        board[r][c].adjacentMines = 0;
      }
    }
  }
}

function revealCell(boardCopy: Cell[][], row: number, col: number): Cell[][] {
  if (boardCopy[row][col].isRevealed || boardCopy[row][col].isFlagged) {
    return boardCopy;
  }
  boardCopy[row][col].isRevealed = true;
  if (boardCopy[row][col].adjacentMines === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < boardCopy.length &&
          newCol >= 0 &&
          newCol < boardCopy[0].length
        ) {
          boardCopy = revealCell(boardCopy, newRow, newCol);
        }
      }
    }
  }
  return boardCopy;
}

/** Verilen koordinatın komşularını döndürür. */
function getNeighbors(
  row: number,
  col: number,
  totalRows: number,
  totalCols: number
): [number, number][] {
  const neighbors: [number, number][] = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const nr = row + i;
      const nc = col + j;
      if (nr >= 0 && nr < totalRows && nc >= 0 && nc < totalCols) {
        neighbors.push([nr, nc]);
      }
    }
  }
  return neighbors;
}

/** Chord özelliği: Eğer açılmış hücrenin çevresinde, bayraklı hücre sayısı hücrenin gösterdiği sayı kadar ise,
    çevredeki bayraklanmamış, açılmamış tüm hücreleri açar. */
function chordCell(
  board: Cell[][],
  row: number,
  col: number,
  setBoard: (board: Cell[][]) => void,
  setGameOver: (over: boolean) => void,
  checkWin: (board: Cell[][]) => boolean
) {
  const totalRows = board.length;
  const totalCols = board[0].length;
  const neighbors = getNeighbors(row, col, totalRows, totalCols);
  let flaggedCount = 0;
  neighbors.forEach(([r, c]) => {
    if (board[r][c].isFlagged) flaggedCount++;
  });
  if (flaggedCount === board[row][col].adjacentMines) {
    let newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
    for (const [r, c] of neighbors) {
      if (!newBoard[r][c].isRevealed && !newBoard[r][c].isFlagged) {
        newBoard[r][c].isRevealed = true;
        // Eğer açılan hücre mayın içeriyorsa chord işlemi başarısız olur.
        if (newBoard[r][c].isMine) {
          setBoard(newBoard);
          setGameOver(true);
          Alert.alert("Game Over", "Chording sırasında mayına bastınız!");
          return;
        } else if (newBoard[r][c].adjacentMines === 0) {
          newBoard = revealCell(newBoard, r, c);
        }
      }
    }
    setBoard(newBoard);
    if (checkWin(newBoard)) {
      setGameOver(true);
      Alert.alert("Tebrikler", "Oyunu kazandınız!");
    }
  }
}

const DifficultySelection = ({
  onSelect,
}: {
  onSelect: (difficulty: string) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Zorluk Seviyesi Seçiniz
      </Text>
      <TouchableOpacity
        onPress={() => onSelect("kolay")}
        style={{
          marginBottom: 10,
          backgroundColor: "green",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Kolay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("normal")}
        style={{
          marginBottom: 10,
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Normal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("zor")}
        style={{
          marginBottom: 10,
          backgroundColor: "red",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Zor</Text>
      </TouchableOpacity>
    </View>
  );
};

const Game = ({
  difficulty,
  resetDifficulty,
}: {
  difficulty: string;
  resetDifficulty: () => void;
}) => {
  const { rows, cols, mines } = getDifficultySettings(difficulty);
  const [board, setBoard] = useState<Cell[][]>(createBoard(rows, cols, mines));
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [flagMode, setFlagMode] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameOver]);

  const handleCellPress = (row: number, col: number) => {
    if (gameOver) return;
    // Bayrak modu aktifse bayrak toggle
    if (flagMode) {
      toggleFlag(row, col);
      return;
    }
    let newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
    const cell = newBoard[row][col];
    // Eğer hücre zaten açılmışsa chord işlemini tetikleyelim
    if (cell.isRevealed) {
      chordCell(newBoard, row, col, setBoard, setGameOver, checkWin);
      return;
    }
    // İlk tıklamada, eğer tıklanan hücre mayınsa mayını kaldır
    if (!gameStarted) {
      if (newBoard[row][col].isMine) {
        newBoard[row][col].isMine = false;
        boardCalculateAdjacency(newBoard);
      }
      setGameStarted(true);
    }
    if (cell.isRevealed || cell.isFlagged) return;
    if (cell.isMine) {
      cell.isRevealed = true;
      setBoard(newBoard);
      setGameOver(true);
      Alert.alert("Game Over", "Mayına bastınız!");
      return;
    } else {
      newBoard = revealCell(newBoard, row, col);
      setBoard(newBoard);
      if (checkWin(newBoard)) {
        setGameWon(true);
        setGameOver(true);
        Alert.alert("Tebrikler", "Oyunu kazandınız!");
      }
    }
  };

  const handleCellLongPress = (row: number, col: number) => {
    if (gameOver) return;
    toggleFlag(row, col);
  };

  const toggleFlag = (row: number, col: number) => {
    let newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
    const cell = newBoard[row][col];
    if (cell.isRevealed) return;
    cell.isFlagged = !cell.isFlagged;
    setBoard(newBoard);
  };

  const checkWin = (board: Cell[][]): boolean => {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        if (!board[r][c].isMine && !board[r][c].isRevealed) return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard(createBoard(rows, cols, mines));
    setGameOver(false);
    setGameWon(false);
    setGameStarted(false);
    setTime(0);
    setFlagMode(false);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Minesweeper - {difficulty.toUpperCase()}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        Süre: {time} saniye
      </Text>
      <TouchableOpacity
        onPress={() => setFlagMode(!flagMode)}
        style={{
          marginBottom: 16,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          backgroundColor: flagMode ? "red" : "blue",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {flagMode ? "Bayrak Modu: Açık" : "Bayrak Modu: Kapalı"}
        </Text>
      </TouchableOpacity>
      <View style={{ alignSelf: "center" }}>
        {board.map((rowData, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {rowData.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                onPress={() => handleCellPress(rowIndex, colIndex)}
                onLongPress={() => handleCellLongPress(rowIndex, colIndex)}
                style={{
                  width: 32,
                  height: 32,
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor: cell.isRevealed ? "#fff" : "#888",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cell.isRevealed && cell.isMine && (
                  <Text style={{ color: "red", fontWeight: "bold" }}>*</Text>
                )}
                {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && (
                  <Text style={{ color: "black" }}>{cell.adjacentMines}</Text>
                )}
                {!cell.isRevealed && cell.isFlagged && (
                  <Text style={{ color: "blue", fontWeight: "bold" }}>F</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={resetGame}
        style={{
          marginTop: 20,
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Oyunu Sıfırla
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={resetDifficulty}
        style={{
          marginTop: 10,
          backgroundColor: "gray",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Zorluk Değiştir
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Minesweeper = () => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  return (
    <>
      {difficulty ? (
        <Game
          difficulty={difficulty}
          resetDifficulty={() => setDifficulty(null)}
        />
      ) : (
        <DifficultySelection onSelect={setDifficulty} />
      )}
    </>
  );
};

export default Minesweeper;
