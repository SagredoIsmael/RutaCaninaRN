import React from "react";
import Colors from "../constants/Colors";
import {StyleSheet, Text, TouchableHighlight} from "react-native";

export default class Footer extends React.Component {
  onPress = () => {
    this.props.onPress && this.props.onPress();
  };
  render() {
    const {onPress, style, ...props} = this.props;
    return (
      <TouchableHighlight
        underlayColor={Colors.pinkChicle}
        {...props}
        onPress={this.onPress}
        style={[styles.touchable, style]}
      >
        <Text style={styles.text}>Cargar más..</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.pinkChicle
  },
  text: {fontWeight: "bold", fontSize: 16}
});
