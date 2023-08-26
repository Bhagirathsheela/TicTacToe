import React from "react";
import { View, Text,StyleSheet } from "react-native";
const Footer = () => {
  return (
    <View style={FooterStyles.headerFooterStyle}>
      <Text style={FooterStyles.textStyle}>Tic Tac Toe</Text>
    </View>
  );
};
const FooterStyles = StyleSheet.create({
  headerFooterStyle: {
    width: "100%",
    height: 80,
    backgroundColor: "#606070",
    padding: 10,
    paddingTop: 20,
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    padding: 7,
  },
});
export default Footer;
