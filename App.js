import { StyleSheet, View } from "react-native";
import { GameBoardScreen } from "./screens/GameBoard";

export default function App() {
  return (
    <View style={styles.container}>
      <GameBoardScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
