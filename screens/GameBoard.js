import { View, Text, StyleSheet } from "react-native";
import { TileContainer } from "../components/TileContainer";

export const GameBoardScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerSection}>
        <Text style={styles.label}>2248</Text>
      </View>
      <TileContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    display: "flex",
    alignItems: "center",
    marginTop: 60,
  },
  label: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f2daa2",
  },
});
