import { StyleSheet, View, Dimensions, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Tile } from "./Tile";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import Svg, { Line } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEmptyBoard,
  getRandomNumber,
  getNearestPowerOfTwo,
  generateRandomBoard,
  colors,
} from "../util/board";

var width = Dimensions.get("window").width;
const ranges = [];

export const TileContainer = () => {
  const [board, updateBoard] = useState(generateRandomBoard(getEmptyBoard()));
  const [selectedRange, setSelectedRange] = useState([]);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    async function fetchTopScore() {
      const storedTopScore = await AsyncStorage.getItem("topScore");

      if (storedTopScore) {
        setTopScore(+storedTopScore);
      }
    }

    fetchTopScore();
  }, []);

  const addTile = (g) => {
    const range = ranges.find(
      (range) =>
        range.x1 <= g.x && g.x <= range.x2 && range.y1 <= g.y && g.y <= range.y2
    );

    if (
      range !== undefined &&
      selectedRange.find((r) => r.row === range.row && r.col === range.col) ===
        undefined
    ) {
      const lastRangeIndex = selectedRange.length - 1;
      if (
        selectedRange.length === 0 ||
        (board[selectedRange[lastRangeIndex].row][
          selectedRange[lastRangeIndex].col
        ] === board[range.row][range.col] &&
          range.row - 1 <= selectedRange[lastRangeIndex].row &&
          selectedRange[lastRangeIndex].row <= range.row + 1 &&
          range.col - 1 <= selectedRange[lastRangeIndex].col &&
          selectedRange[lastRangeIndex].col <= range.col + 1)
      ) {
        const rgs = [...selectedRange, range];
        setSelectedRange(rgs);

        const x = (range.x1 + range.x2) / 2;
        const y = (range.y1 + range.y2) / 2;
        const newPaths = [...paths];
        if (newPaths.length) {
          const index = newPaths.length - 1;
          newPaths[index] = {
            ...newPaths[index],
            x2: x,
            y2: y,
          };
          setPaths(newPaths);
        }
        newPaths.push({
          x1: x,
          y1: y,
          x2: x,
          y2: y,
          color: colors[board[range.row][range.col]],
        });
        setPaths(newPaths);
      }
    } else {
      const newPaths = [...paths];
      if (newPaths.length) {
        const index = newPaths.length - 1;
        newPaths[index] = {
          ...newPaths[index],
          x2: g.x,
          y2: g.y,
        };
        setPaths(newPaths);
      }
    }
  };

  const changeBoardValues = () => {
    if (selectedRange.length >= 2) {
      let sum = 0;
      const newScore = calculateScore(
        board[selectedRange[0].row][selectedRange[0].col]
      );
      const totalScore = score + newScore;
      setScore(totalScore);
      if (totalScore >= topScore) {
        setTopScore(totalScore);
        AsyncStorage.setItem("topScore", totalScore.toString());
      }
      selectedRange.forEach((r, index) => {
        const newBoard = [...board];
        if (index === selectedRange.length - 1) {
          sum = sum + newBoard[r.row][r.col];
          newBoard[r.row][r.col] = getNearestPowerOfTwo(sum);
          if (getNearestPowerOfTwo(sum) === 2048) {
            Alert.alert("Game End", "Congratulations! You have done it.", [
              { text: "Restart", onPress: () => onRestartGame() },
            ]);
          }
        } else {
          sum = sum + newBoard[r.row][r.col];
          newBoard[r.row][r.col] = getRandomNumber();
        }
        updateBoard(newBoard);
      });
    }
  };

  const onRestartGame = () => {
    updateBoard(generateRandomBoard(getEmptyBoard()));
    setSelectedRange([]);
    setScore(0);
    setPaths([]);
  };

  const calculateScore = (value) => {
    return (selectedRange.length - 2) * value;
  };

  const panGesture = Gesture.Pan()
    .onUpdate((g) => {
      runOnJS(addTile)(g);
    })
    .onEnd((g) => {
      runOnJS(changeBoardValues)();
      runOnJS(setSelectedRange)([]);
      runOnJS(setPaths)([]);
    });

  onCellLayout = (event, rowIndex, cellIndex) => {
    const { height, width, x, y } = event.nativeEvent.layout;
    const range = {
      row: rowIndex,
      col: cellIndex,
      x1: x,
      x2: x + width,
      y1: y + rowIndex * (height + 2 * y),
      y2: y + height + rowIndex * (height + 2 * y),
    };
    ranges.push(range);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.displayScore}>
        <View>
          <Text style={styles.label}>Top Score</Text>
          <Text style={styles.lableValue}>{topScore}</Text>
        </View>
        <View>
          <Text style={styles.label}>Score</Text>
          <Text style={styles.lableValue}>{score}</Text>
        </View>
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector style={{ flex: 1 }} gesture={panGesture}>
          <View style={styles.boardStyle}>
            <Svg style={styles.svgPath}>
              {paths.map((p, index) => (
                <Line
                  key={index}
                  x1={p.x1}
                  y1={p.y1}
                  x2={p.x2}
                  y2={p.y2}
                  strokeWidth={20}
                  stroke={p.color}
                />
              ))}
            </Svg>
            {board.map((row, rowIndex) => (
              <View key={`cell-${rowIndex}`} style={styles.rowStyle}>
                {row.map((value, cellIndex) => (
                  <Tile
                    key={`cell-${cellIndex}`}
                    value={value}
                    onCellLayout={(event) =>
                      onCellLayout(event, rowIndex, cellIndex)
                    }
                  />
                ))}
              </View>
            ))}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  boardStyle: {
    width: width,
    backgroundColor: "#f2daa2",
    marginTop: 30,
  },
  rowStyle: {
    flexDirection: "row",
    height: width / 4,
  },
  svgPath: {
    position: "absolute",
  },
  displayScore: {
    flexDirection: "row",
    marginHorizontal: 80,
    justifyContent: "space-between",
    marginTop: 30,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lableValue: {
    fontSize: 16,
    fontWeight: "normal",
  },
});
