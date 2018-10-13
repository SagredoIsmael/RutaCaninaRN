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
  TouchableHighlight,
} from 'react-native'
import * as actions from '../actions'
import Colors from '../constants/Colors'

class Profile extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    image: null,
    hasCameraPermission: null,
  }


  userRequest = async () => {
      const { dataUser } = await Fire.shared.getInfoMyUser()
      this.props.insert_dataUser(dataUser)
      //
      // // Iteratively add posts
      // let posts = {};
      // for (let child of data) {
      //   posts[child.key] = child;
      // }
      // this.addPosts(posts);
      //
      // // Finish loading, this will stop the refreshing animation.
      // this.setState({ loading: false });
    };


  async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      this.setState({ hasCameraPermission: status === 'granted' })
      this.userRequest()
  }


  renderImageProfile() {
    return (
      <Image
        style={ styles.avatar }
        source={{uri: this.props.dataUser.image }}
      />
    );
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
      <ScrollView style={styles.container}>
        <View style={styles.viewGeneral}>
          <TouchableHighlight style={styles.buttonGeneral} onPress={()=>this._pickImage()}>
            {this.renderImageProfile()}
          </TouchableHighlight>
          (<Text style={{ fontSize: 30 }}>
            {this.props.dataUser.name}
          </Text>)
          <Button
             style={styles.logOutButton}
             title={'Desconectar'}
             onPress={this.LogOutOnButtonPress}
           />
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </ScrollView>
    )
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })
    if (!result.cancelled) {
     uploadUrl = await Fire.shared.uploadImageUserAsync(result.uri)
     uploadUrl? this.userRequest() :   Alert.alert(
         '¡Wuau!',
         'Error al cargar la foto', [ {text: 'Aceptar'}, ],
         { cancelable: false })
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
    backgroundColor: '#bedce2',
  },
  viewGeneral:{
    backgroundColor: '#bedce2',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logOutButton: {
    backgroundColor: Colors.pinkChicle
   },
   avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: Colors.pinkChicle,
    marginBottom:10,
    alignSelf: 'center',
    position: 'relative',
    marginTop:60
  },
   buttonGeneral: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
});

const mapStateToProps = state => {
  return {
    keyUser : state.keyUser,
    dataUser : state.dataUser,
  }
}

export default connect(mapStateToProps, actions)(Profile)
