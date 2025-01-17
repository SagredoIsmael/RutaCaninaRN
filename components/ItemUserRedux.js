import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setEditingRoute} from '../actions/routesActions'
import {View, Text, Image, TouchableHighlight, StyleSheet, BackHandler} from 'react-native'
import Colors from "../constants/Colors"
import Icon from "react-native-vector-icons/Octicons"
import {Avatar} from "react-native-elements"

const profileImageSize = 36
const padding = 12

class ItemUserRedux extends Component {

  render() {
    const isMine = (this.props.keyCreator == this.props.myKeyUser)
    return (
      <View style={[styles.row, styles.padding]}>
        <TouchableHighlight width={145} height={145} activeOpacity={0.7} underlayColor="rgba(98,93,144,0)" overlayContainerStyle={{
            backgroundColor: "transparent"
          }} onPress={() => this.goToProfile()}>
          <View style={styles.row}>
            <Avatar style={styles.avatar} small="small" rounded={true} source={{
                uri: this.props.imageCreator
              }} activeOpacity={0.7}/>
            <Text style={styles.text}>{this.props.nameCreator}</Text>
          </View>
        </TouchableHighlight>
        {
          isMine && !this.props.dismissModal?
          (<TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => this._goToEditRoute()} style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 2,
              marginRight: 2
            }}>
              <Icon name="settings" color={Colors.pinkChicle} size={32}/>
          </TouchableHighlight>)
          :
          null
        }
      </View>
    )
  }

  _goToEditRoute = () => {
    const routeEditing = {...this.props.route, isEditing: true}
    this.props.setEditingRoute(routeEditing)
    this.props.nav.navigate('NewRoute', {restoreBackButton: this._confiBackButtonAndroid, titleHeader: 'Editar ruta'})
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
  }

  _confiBackButtonAndroid = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('RutasStack')
      return true;
    })
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
})

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setEditingRoute: (route) => {
      dispatch(setEditingRoute(route))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemUserRedux)
