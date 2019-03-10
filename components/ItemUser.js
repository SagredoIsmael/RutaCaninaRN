import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native'
import Colors from "../constants/Colors"
import {Ionicons} from "@expo/vector-icons"

const profileImageSize = 36
const padding = 12

export default class ItemUser extends Component {

  render() {
    return (<View style={[styles.row, styles.padding]}>
      <TouchableHighlight width={145} height={145} activeOpacity={0.7} underlayColor="rgba(98,93,144,0)" overlayContainerStyle={{
          backgroundColor: "transparent"
        }} onPress={() => this.goToProfile()}>
        <View style={styles.row}>
          <Image style={styles.avatar} source={{
              uri: this.props.imageCreator
            }}/>
          <Text style={styles.text}>{this.props.nameCreator}</Text>
        </View>
      </TouchableHighlight>
    </View>)
  }

  // {this.renderIcon("ios-more")}
  renderIcon(name) {
    return (<Ionicons style={{
        marginRight: 5
      }} name={name} size={40} color={Colors.pinkChicle}/>)
  }

  goToProfile = () => {
    if (this.props.isHiddenOption) {
      //nothing to do
    } else {
      if (this.props.keyCreator == this.props.myKeyUser) {
        this.props.nav.navigate('PerfilStack')
      } else {
        this.props.nav.navigate("Profile", {keyUser: this.props.keyCreator})
      }
    }
    if (this.props.dismissModal != null) {
      this.props.dismissModal()
    }
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
  }
});
