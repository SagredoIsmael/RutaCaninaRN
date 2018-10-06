import React, { Component } from 'react'
import { Permissions, ImagePicker } from 'expo'
import {connect} from 'react-redux'
import Fire from '../api/Fire'
import {
  AppRegistry,
  StyleSheet,
  Alert,
  Text,
  View,
  Button,
  ScrollView,
  Image,
} from 'react-native'
import * as actions from '../actions'
import Colors from '../constants/Colors'

class Profile extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    image: null,
    hasCameraPermission: null
  }
  
  async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    let { image } = this.state;
    const { hasCameraPermission } = this.state;
    // if ((hasCameraPermission === null) || (hasCameraPermission === false)) {
    //   return
    //      <View style={styles.container}>
    //        <Text>No tiene permisos para acceder a la galería</Text>
    //      </View>
    // } else {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <Button
           style={styles.logOutButton}
           title={'Desconectar'}
           onPress={this.LogOutOnButtonPress}
         />
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    )
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  LogOutOnButtonPress = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Esta seguro?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Aceptar', onPress: () => this.logOut() },
      ],
      { cancelable: false }
    )
  }

  logOut = () => {
    this.props.insert_user('')
    Fire.shared.logOutUser()
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.pinkChicle,
    flex: 1,
  },
  logOutButton: {
    backgroundColor: Colors.pinkChicle
   },
   avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf: 'center',
    position: 'relative',
    marginTop:130
  },
});

const mapStateToProps = state => {
  return {
    dataRoutes : state.dataRoutes,
    keyUser : state.keyUser,
  }
}

export default connect(mapStateToProps, actions)(Profile)
