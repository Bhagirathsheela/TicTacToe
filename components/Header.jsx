import React from 'react'
import { View, Text, StyleSheet } from "react-native";
const Header = () => {
  return (
    <View style={HeaderStyles.headerFooterStyle}>
      <Text style={HeaderStyles.textStyle}>Tic Tac Toe</Text>
    </View>
  );

}
const HeaderStyles = StyleSheet.create({
  headerFooterStyle: {
    width: "100%",
    height: 80,
    backgroundColor: "#606070",
    padding:10,
    paddingTop:35,
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    padding: 7,
  },
});
export default Header