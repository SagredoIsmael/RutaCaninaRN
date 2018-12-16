import React, { Component } from 'react'
import { Permissions, ImagePicker, Font, Constants } from 'expo'
import {connect} from 'react-redux'
import Fire from '../api/Fire'
import MenuOptions from './MenuOptions/Menu.js'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import { Avatar, Button } from 'react-native-elements'
import PopupDialog, { SlideAnimation } from './react-native-popup-dialog';
import { PortalProvider, BlackPortal, WhitePortal } from 'react-native-portal';
import Loader from './Loader'
import {
  AppRegistry,
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import * as actions from '../actions'
import Colors from '../constants/Colors'

AppRegistry.registerComponent('MenuOptions', () => MenuOptions);

class Profile extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    image: null,
    hasCameraPermission: null,
    isLoading:false,
    fontLoaded: false,
    dogSelect : null,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../assets/fonts/Georgia.ttf'),
      'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../assets/fonts/Montserrat-Light.ttf'),
      'bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }


  userRequest = async () => {
      const { dataUser } = await Fire.shared.getInfoMyUser()
      this.props.insert_dataUser(dataUser)
      this.setState({ isLoading: false });
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


  renderListCards() {
    return _.map(this.props.dataUser.dogs, (user, index) => {
      return this.renderCard(user, index);
    });
  }

  renderDialogPopup() {
    return (
      <PortalProvider>
        <WhitePortal name='popup'/>
        <BlackPortal name='popup'>
          <PopupDialog
            dialogAnimation={slideAnimation}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            closeButton={(() => {
              return (
                <TouchableOpacity onPress={() => this.popupDialog.dismiss()} style={styles.closeButtonContainer}>
                    <Text style={[styles.closeButton, {color:'black'}]}>X</Text>
                </TouchableOpacity>
              );
            })()}
            >
            {this.state.dogSelect?
            <View>
              <ImageBackground
                source={require('../assets/images/background.png')}
                style={{width: '100%', height: '100%'}}>
                <Image style={ styles.avatarDogs } source={this.state.dogSelect.avatar? {uri: this.state.dogSelect.avatar } : {uri: urlPhotoDog = 'https://www.avatarys.com/var/resizes/Cool-Avatars/Animal-Avatars/cool-dog-avatar-by-avatarys.jpg?m=1436714277' }}/>
                <Text style={{ fontFamily: 'bold', fontSize: 20, color: 'rgba(98,93,144,1)', marginTop: 5, textAlign: 'center'}}>
                  {("¡Hola soy " + this.state.dogSelect.name +"!")}</Text>
                <Text style={{fontFamily: 'regular', fontSize: 15,  marginTop: 10, marginLeft: 10, marginRight:10, textAlign: 'center', color: 'gray'}}>
                  {("Soy " + this.state.dogSelect.gender + " de " + this.state.dogSelect.age  + " años y mis padres dicen que parezco " + this.state.dogSelect.breed + ", aunque yo me veo más chic.")}</Text>
                <Text style={{fontFamily: 'regular', fontSize: 15,  marginTop: 10, marginLeft: 10, marginRight:10, textAlign: 'center', color: 'gray'}}>
                  {("Me considero " + this.state.dogSelect.conduct + ", a la vez que " + this.state.dogSelect.temperament + ". ¡Tendrías que conocerme!")}</Text>
              </ImageBackground>

            </View>
            :
              <View> <Text>  Error al cargar los datos del can.</Text> </View>
            }
          </PopupDialog>
        </BlackPortal>
      </PortalProvider>
    )
  }


  renderCard(dog, index) {
    const { name, avatar } = dog;
    return (
      <View key={index} style={{height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 15}}>
            <Avatar small rounded source={ avatar? { uri: avatar} : {uri: urlPhotoDog = 'https://www.avatarys.com/var/resizes/Cool-Avatars/Animal-Avatars/cool-dog-avatar-by-avatarys.jpg?m=1436714277' }} activeOpacity={0.7}/>
          </View>
          <Text style={{fontFamily: 'regular', fontSize: 15, marginLeft: 10, color: Colors.verdeOscuro}}>
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 10 }}>
          <TouchableHighlight underlayColor='rgba(98,93,144,0)' onPress={()=>this.infoDogs(dog)}>
            <View style={{ backgroundColor: Colors.verdeOscuro, width: 70, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
              <Icon name='md-information-circle' color={Colors.whiteCrudo} size={25} />
            <Text style={{color: 'white', fontFamily: 'regular', fontSize: 13, marginLeft: 5}}>Info</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='rgba(98,93,144,0)' onPress={()=>this.gotoDogScreen(dog.key, dog.name)}>
            <View style={{ backgroundColor: Colors.pinkChicle, width: 35, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
              <Icon name='md-settings' color='white' size={20}/>
            </View>
          </TouchableHighlight>
        </View>
      </View>
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
      <PortalProvider>
        <ScrollView style={styles.container}>
          {this.state.fontLoaded ?
            <ScrollView style={{flex: 1, marginBottom: 20, marginTop:0}}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: Colors.whiteCrudo, borderRadius: 5, alignItems: 'center', marginHorizontal: 10, height: 250, marginBottom: 10, marginTop: 80}}>
                  <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                       <TouchableHighlight width={145} height={145} activeOpacity={0.7} underlayColor='rgba(98,93,144,0)' overlayContainerStyle={{backgroundColor: 'transparent'}} onPress={()=>this._pickImage()}>
                          {this.renderImageProfile()}
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <View style={{ flex: 1, marginTop: 40, justifyContent: 'center'}}>
                        <Text style={{ fontFamily: 'bold', fontSize: 25, color: Colors.verdeOscuro, marginLeft: -15}}>
                          {this.props.dataUser.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{width: 300, borderWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10}} />
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1}}>
                      <Text style={{color: Colors.verdeOscuro, fontFamily: 'regular', fontSize: 20, marginLeft: 25}}>{'Mis canes'}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Button
                        title='Agregar perrete'
                        buttonStyle={{height: 33, width: 120, backgroundColor: Colors.pinkChicle, borderRadius: 5}}
                        titleStyle={{fontFamily: 'regular', fontSize: 13, color: 'white'}}
                        onPress={()=>this.gotoDogScreen(null, 'Nuevo can')}
                        underlayColor="transparent"
                      />
                    </View>
                  </View>
                </View>
                {this.renderListCards()}
                <Loader loading={this.state.isLoading} size={'large'} color="#ff66be" />
              </ScrollView>
             :
          <Text>Loading...</Text>
          }
          <MenuOptions/>
          {this.renderDialogPopup()}
        </ScrollView>
      </PortalProvider>
    )
  }


  gotoDogScreen = (keyDog, action) => {
    this.props.nav.navigate('Dogs', {keyDog:keyDog, titleHeader:action});
  }


  infoDogs = (dog) => {
    this.setState({ dogSelect: dog });
    this.popupDialog.show();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })
    if (!result.cancelled) {
    this.setState({ isLoading: true });
     uploadUrl = await Fire.shared.uploadImageUserAsync(result.uri)
     uploadUrl? this.userRequest() :   Alert.alert(
         '¡Wuau!',
         'Error al cargar la foto', [ {text: 'Aceptar'}, ],
         { cancelable: false })
    }
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bedce2',
    height: '100%'
  },
   avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: Colors.verdeOscuro,
    marginBottom:20,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 40
  },
  avatarDogs: {
   width: 130,
   height: 130,
   borderRadius: 63,
   borderWidth: 3,
   borderColor: Colors.verdeOscuro,
   marginTop:10,
   alignSelf: 'center',
   position: 'relative',
 },
  closeButtonContainer: {
		position: 'absolute',
		top:51,
		width:44,
		height:44,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center',
		borderRadius: 50
	},
	closeButton: {
		color:'white',
		textAlign:'center'
	},
  backgroundImage: {

    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

const slideAnimation = new SlideAnimation({
	slideFrom: 'bottom',
});

const mapStateToProps = state => {
  return {
    keyUser : state.keyUser,
    dataUser : state.dataUser,
  }
}

export default connect(mapStateToProps, actions)(Profile)
