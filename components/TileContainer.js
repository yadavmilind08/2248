import { StyleSheet, View, Dimensions, Text, SafeAreaView } from "react-native";
import { useState } from "react";
import { Tile } from "./Tile";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
  runOnJS,
} from "react-native-reanimated";
import Svg, { Line, Path } from "react-native-svg";

export const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const nearestPowerOfTwo = (num) => {
  // dealing only with non-negative numbers
  if (num < 0) {
    num *= -1;
  }
  let base = 1;
  while (base < num) {
    if (num - base < Math.floor(base / 2)) {
      return base;
    }
    base *= 2;
  }
  return base;
};

export const generateRandom = (board) => {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      board[row][col] = nearestPowerOfTwo(randomInteger(2, 8));
    }
  }

  return board;
};

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const TileContainer = () => {
  const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));
  const [selectedRange, setSelectedRange] = useState([]);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  const [tGestureStart, setTGestureStart] = useState();
  const [tGestureMove, setTGestureMove] = useState();
  const [tGestureUpdate, setTGestureUpdate] = useState();
  const [tGestureEnd, setTGestureEnd] = useState();

  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const ranges = [
    { row: 0, col: 0, x1: 50, x2: 100, y1: 50, y2: 100 },
    { row: 0, col: 1, x1: 150, x2: 200, y1: 50, y2: 100 },
    { row: 0, col: 2, x1: 250, x2: 300, y1: 50, y2: 100 },
    { row: 0, col: 3, x1: 350, x2: 400, y1: 50, y2: 100 },

    { row: 1, col: 0, x1: 50, x2: 100, y1: 150, y2: 200 },
    { row: 1, col: 1, x1: 150, x2: 200, y1: 150, y2: 200 },
    { row: 1, col: 2, x1: 250, x2: 300, y1: 150, y2: 200 },
    { row: 1, col: 3, x1: 350, x2: 400, y1: 150, y2: 200 },

    { row: 2, col: 0, x1: 50, x2: 100, y1: 250, y2: 300 },
    { row: 2, col: 1, x1: 150, x2: 200, y1: 250, y2: 300 },
    { row: 2, col: 2, x1: 250, x2: 300, y1: 250, y2: 300 },
    { row: 2, col: 3, x1: 350, x2: 400, y1: 250, y2: 300 },

    { row: 3, col: 0, x1: 50, x2: 100, y1: 350, y2: 400 },
    { row: 3, col: 1, x1: 150, x2: 200, y1: 350, y2: 400 },
    { row: 3, col: 2, x1: 250, x2: 300, y1: 350, y2: 400 },
    { row: 3, col: 3, x1: 350, x2: 400, y1: 350, y2: 400 },

    { row: 4, col: 0, x1: 50, x2: 100, y1: 450, y2: 500 },
    { row: 4, col: 1, x1: 150, x2: 200, y1: 450, y2: 500 },
    { row: 4, col: 2, x1: 250, x2: 300, y1: 450, y2: 500 },
    { row: 4, col: 3, x1: 350, x2: 400, y1: 450, y2: 500 },

    { row: 5, col: 0, x1: 50, x2: 100, y1: 550, y2: 600 },
    { row: 5, col: 1, x1: 150, x2: 200, y1: 550, y2: 600 },
    { row: 5, col: 2, x1: 250, x2: 300, y1: 550, y2: 600 },
    { row: 5, col: 3, x1: 350, x2: 400, y1: 550, y2: 600 },
  ];

  const findObj = (g) => {
    const range = ranges.find((range) => {
      console.log("val", g.x, g.y);
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
    console.log({ range, selectedRange });

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
    console.log({ selectedRange });
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
      }
      selectedRange.forEach((r, index) => {
        const newBoard = [...board];
        if (index === selectedRange.length - 1) {
          sum = sum + newBoard[r.row][r.col];
          newBoard[r.row][r.col] = nearestPowerOfTwo(sum);
        } else {
          sum = sum + newBoard[r.row][r.col];
          newBoard[r.row][r.col] = nearestPowerOfTwo(randomInteger(2, 8));
        }
        updateBoard(newBoard);
      });
    }
  };

  const calculateScore = (value) => {
    return (selectedRange.length - 2) * value;
  };

  const panGesture = Gesture.Pan()
    .onStart((g) => {
      console.log("start", { g });
      runOnJS(setSelectedRange)([]);
      // runOnJS(findObj)(g);
      // setTGestureStart(`${Math.round(g.x)}, ${Math.round(g.y)}`);
    })
    .onTouchesMove((g) => {
      // console.log("move", { g });
      // setTGestureMove(
      //   `${Math.round(g.changedTouches[0].x)}, ${Math.round(
      //     g.changedTouches[0].y
      //   )}`
      // );
    })
    .onUpdate((g) => {
      console.log("update", { g });
      runOnJS(findObj)(g);
      // setTGestureUpdate(`${Math.round(g.x)}, ${Math.round(g.y)}`);
    })
    .onEnd((g) => {
      console.log("end", { g });
      runOnJS(changeBoardValues)();
      // setTGestureEnd(`${Math.round(g.x)}, ${Math.round(g.y)}`);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const radius = useSharedValue(50);

  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
    M10 60 L90 90 V10 H50
    `;
    return {
      d: path,
    };
  });

  return (
    // <GestureDetector gesture={panGesture}>
    //   {/* <Animated.View style={[styles.box, animatedStyle]} /> */}
    //   <Svg height={height} width={width}>
    //     <AnimatedPath
    //       animatedProps={animatedProps}
    //       stroke="#4ade80"
    //       strokeWidth="24"
    //     />
    //   </Svg>

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
                  <Tile key={`cell-${cellIndex}`} value={value} />
                ))}
              </View>
            ))}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>

    // <View style={styles.boardStyle}>
    //   {board.map((row, rowIndex) => (
    //     <View key={`cell-${rowIndex}`} style={styles.rowStyle}>
    //       {row.map((value, cellIndex) => (
    //         <Tile key={`cell-${cellIndex}`} value={value} />
    //       ))}
    //     </View>
    //   ))}
    // </View>
  );
};

const styles = StyleSheet.create({
  boardStyle: {
    width: width,
    padding: 5,
    backgroundColor: "#f2daa2",
    marginTop: 50,
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
});
