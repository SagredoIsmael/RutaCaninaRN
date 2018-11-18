import React, { Component } from 'react'
import { Permissions, ImagePicker, Font } from 'expo'
import {connect} from 'react-redux'
import Fire from '../api/Fire'
import MenuOptions from './MenuOptions/Menu.js'
import BouncingPreloader from 'react-native-bouncing-preloader'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import { Avatar, Button } from 'react-native-elements'
import {
  AppRegistry,
  StyleSheet,
  Alert,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native'
import * as actions from '../actions'
import Colors from '../constants/Colors'

AppRegistry.registerComponent('MenuOptions', () => MenuOptions);

const icons = [
  require('../assets/images/bone.png'),
  require('../assets/images/dog.png'),
  require('../assets/images/paws.png'),
  require('../assets/images/toys.png'),
];

const USERS = [
  {
    name: 'Johh Smith',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    value: '- 164'
  },
  {
    name: 'Sarah Parker',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
    value: '+ 203',
    positive: true
  },
  {
    name: 'Paul Allen',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
    value: '+ 464',
    positive: true
  },
  {
    name: 'Terry Andrews',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
    value: '- 80',
    positive: false
  },
  {
    name: 'Andy Vitale',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
    value: '- 230',
    positive: false
  },
  {
    name: 'Katy Friedson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    value: '+ 160',
    positive: true
  },
];

class Profile extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    image: null,
    hasCameraPermission: null,
    isLoading:false,
    fontLoaded: false,
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

  renderValue(user) {
    const { value, positive } = user;

    if (positive) {
      return (
        <View style={{ backgroundColor: 'rgba(220,230,218,1)', width: 70, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
          <Icon
            name='md-arrow-dropup'
            color='green'
            size={25}
          />
          <Text style={{color: 'green', fontFamily: 'regular', fontSize: 13, marginLeft: 5}}>{value}</Text>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: 'rgba(244,230,224,1)', width: 70, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
          <Icon
            name='md-arrow-dropdown'
            color='red'
            size={25}
          />
          <Text style={{color: 'red', fontFamily: 'regular', fontSize: 13, marginLeft: 5}}>{value}</Text>
        </View>
      );
    }
  }

  renderCard(user, index) {
    const { name, avatar } = user;
    return (
      <View key={index} style={{height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 15}}>
            <Avatar
              small
              rounded
              source={{
                uri: avatar,
              }}
              activeOpacity={0.7}
            />
          </View>
          <Text style={{fontFamily: 'regular', fontSize: 15, marginLeft: 10, color: 'gray'}}>
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 10 }}>
          {this.renderValue(user)}
          <View style={{ backgroundColor: 'rgba(222,222,222,1)', width: 35, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
            <Icon
              name='md-person-add'
              color='gray'
              size={20}
            />
          </View>
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
      <ScrollView style={styles.container}>
        {this.state.fontLoaded ?
          <ScrollView style={{flex: 1, marginBottom: 20, marginTop:0}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: Colors.whiteCrudo, borderRadius: 5, alignItems: 'center', marginHorizontal: 10, height: 250, marginBottom: 10, marginTop: 80}}>
                <View style={{flex: 3, flexDirection: 'row'}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                     <TouchableHighlight width={145} height={145} activeOpacity={0.7} overlayContainerStyle={{backgroundColor: 'transparent'}} onPress={()=>this._pickImage()}>
                        {this.renderImageProfile()}
                      </TouchableHighlight>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ flex: 1, marginTop: 50, justifyContent: 'center'}}>
                      <Text style={{ fontFamily: 'bold', fontSize: 25, color: 'rgba(98,93,144,1)', marginLeft: -15}}>
                        {this.props.dataUser.name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{width: 300, borderWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10}} />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <Text style={{color: 'rgba(113, 154, 112, 1)', fontFamily: 'regular', fontSize: 20, marginLeft: 25}}>{'Mis canes'}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Button
                      title='Agregar perrete'
                      buttonStyle={{height: 33, width: 120, backgroundColor: 'rgba(113, 154, 112, 1)', borderRadius: 5}}
                      titleStyle={{fontFamily: 'regular', fontSize: 13, color: 'white'}}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                </View>
              </View>
              {this.renderListCards()}
              <MenuOptions/>
            </ScrollView>
           :
        <Text>Loading...</Text>
        }
      </ScrollView>
    )
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
    this.setState({ isLoading: false });
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bedce2',
  },
  viewGeneral:{
    backgroundColor: '#bedce2',
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
    marginBottom:20,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 40
  },
});

const mapStateToProps = state => {
  return {
    keyUser : state.keyUser,
    dataUser : state.dataUser,
  }
}

export default connect(mapStateToProps, actions)(Profile)
