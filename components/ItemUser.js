import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native'
import Colors from "../constants/Colors"
import {Ionicons} from "@expo/vector-icons"

const profileImageSize = 36
const padding = 12


export default class ItemUser extends Component {

  render(){
    return (<View style={[styles.row, styles.padding]}>
      <View style={styles.row}>
        <Image style={styles.avatar} source={{
            uri: this.props.imageCreator
          }}/>
        <Text style={styles.text}>{this.props.nameCreator}</Text>
      </View>
      {this.renderIcon("ios-more")}
    </View>)
  }


  renderIcon(name) {
    return (<Ionicons style={{
        marginRight: 5
      }} name={name} size={40} color={Colors.pinkChicle}/>)
  }

}

const styles = StyleSheet.create({
  padding: {
    padding
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: Colors.whiteCrudo,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.pinkChicle,
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: "cover",
    marginRight: padding
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontWeight: "600",
    fontSize: 15
  },
});
