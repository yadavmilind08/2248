import { StyleSheet, View, Text } from "react-native";

export const Tile = ({ value }) => {
  return (
    <View style={[styles.cellStyle, styles[`cell${value}`]]}>
      <Text style={styles.textStyle}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cellStyle: {
    backgroundColor: "#f0f2f0",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
  },
  cell2: {
    backgroundColor: "#ffa500",
  },
  cell4: {
    backgroundColor: "#27cfcf",
  },
  cell8: {
    backgroundColor: "#ffc0cb",
  },
  cell16: {
    backgroundColor: "#ffd700",
  },
  cell32: {
    backgroundColor: "#adff2f",
  },
  cell64: {
    backgroundColor: "#e9c46a",
  },
  cell128: {
    backgroundColor: "#daa520",
  },
  cell256: {
    backgroundColor: "#663399",
  },
  cell512: {
    backgroundColor: "#00ffff",
  },
  cell1024: {
    backgroundColor: "#6a5ab0",
  },
  cell2048: {
    backgroundColor: "#7fffd4",
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
