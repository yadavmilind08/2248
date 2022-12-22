import { StyleSheet, View, Dimensions, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Tile } from "./Tile";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEmptyBoard,
  randomInteger,
  nearestPowerOfTwo,
  generateRandom,
  ranges,
  colors,
} from "../util/board";

var width = Dimensions.get("window").width;

export const TileContainer = () => {
  const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));
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

  const findObj = (g) => {
    const range = ranges.find((range) => {
      if (
        range.x1 <= g.x &&
        g.x <= range.x2 &&
        range.y1 <= g.y &&
        g.y <= range.y2
      ) {
        return true;
      }
      return false;
    });

    if (
      range !== undefined &&
      selectedRange.find((r) => r.row === range.row && r.col === range.col) ===
        undefined
    ) {
      if (
        selectedRange.length === 0 ||
        board[selectedRange[selectedRange.length - 1].row][
          selectedRange[selectedRange.length - 1].col
        ] === board[range.row][range.col]
      ) {
        const rgs = [...selectedRange, range];
        setSelectedRange(rgs);
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
          newBoard[r.row][r.col] = nearestPowerOfTwo(sum);
          if (nearestPowerOfTwo(sum) === 2048) {
            Alert.alert("Game End", "Congratulations! You have done it.", [
              { text: "Restart", onPress: () => onRestartGame() },
            ]);
          }
        } else {
          sum = sum + newBoard[r.row][r.col];
          newBoard[r.row][r.col] = nearestPowerOfTwo(randomInteger(2, 8));
        }
        updateBoard(newBoard);
      });
    }
  };

  const onRestartGame = () => {
    updateBoard(generateRandom(getEmptyBoard()));
    setSelectedRange([]);
    setScore(0);
    setPaths([]);
  };

  const startPath = (g) => {
    const range = ranges.find((range) => {
      if (
        range.x1 <= g.x &&
        g.x <= range.x2 &&
        range.y1 <= g.y &&
        g.y <= range.y2
      ) {
        return true;
      }
      return false;
    });

    if (range !== undefined) {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: colors[board[range.row][range.col]],
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
    }
  };

  const updatePath = (g) => {
    const index = paths.length - 1;
    const newPaths = [...paths];
    if (newPaths?.[index]?.segments) {
      newPaths[index].segments.push(`L ${g.x} ${g.y}`);
      setPaths(newPaths);
    }
  };

  const calculateScore = (value) => {
    return (selectedRange.length - 2) * value;
  };

  const panGesture = Gesture.Pan()
    .onStart((g) => {
      runOnJS(setSelectedRange)([]);
      runOnJS(startPath)(g);
    })
    .onUpdate((g) => {
      runOnJS(findObj)(g);
      runOnJS(updatePath)(g);
    })
    .onEnd((g) => {
      runOnJS(changeBoardValues)();
      runOnJS(setPaths)([]);
    });

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
            {board.map((row, rowIndex) => (
              <View key={`cell-${rowIndex}`} style={styles.rowStyle}>
                {row.map((value, cellIndex) => (
                  <Tile
                    key={`cell-${cellIndex}`}
                    cellIndex={cellIndex}
                    rowIndex={rowIndex}
                    value={value}
                  />
                ))}
              </View>
            ))}
            <Svg style={styles.svgPath}>
              {paths.map((p, index) => (
                <Path
                  key={index}
                  d={p.segments.join(" ")}
                  strokeWidth={20}
                  stroke={p.color}
                />
              ))}
            </Svg>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  boardStyle: {
    width: width,
    padding: 5,
    backgroundColor: "#f2daa2",
    marginTop: 50,
    zIndex: 2,
    elevation: 2,
  },
  rowStyle: {
    flexDirection: "row",
    height: width / 4,
  },
  displayScore: {
    marginTop: 100,
    flexDirection: "row",
    marginHorizontal: 80,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lableValue: {
    fontSize: 16,
    fontWeight: "normal",
  },
  svgPath: {
    position: "absolute",
    zIndex: 1,
    elevation: 1,
  },
});
