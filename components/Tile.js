import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/color";

export const Tile = ({ value, onCellLayout }) => {
  return (
    <View
      style={[styles.cellStyle, { backgroundColor: colors[value] }]}
      onLayout={onCellLayout}
    >
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
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
