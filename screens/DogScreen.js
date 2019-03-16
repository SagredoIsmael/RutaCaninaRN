import React from 'react';
import {connect} from 'react-redux'
import Fire from '../api/Fire'
import {ImagePicker} from 'expo'
import _ from 'lodash'
import * as actions from '../actions'
import Loader from '../components/Modals/Loader'
import Colors from '../constants/Colors'
import {Hoshi} from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/Ionicons'
import SwitchSelector from 'react-native-switch-selector'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker1 from '../components/CustomMarker1'
import CustomMarker2 from '../components/CustomMarker2'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Slider,
  Text,
  ImageBackground,
  View,
  Button,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';

const optionsConduct = ['granuja y sinvergüenza', 'torbellino', 'pasota total']
const optionsTemperament = ['muy dulce', 'apacible y amigable', 'independiente y libre', 'prudente y pedante', 'alterable e irritable']

class DogScreen extends React.Component {
  static ourself = null;
  constructor() {
    super()
    ourself = this;
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('titleHeader', 'Mis canes'),
      headerTitleStyle: {
        color: Colors.verdeOscuro,
        fontSize: 28
      },
      headerStyle: {
        backgroundColor: Colors.background
      },
      headerRight: (<Button onPress={() => ourself.comprobeChanges('guardar')} title={'Guardar'} color={Colors.pinkChicle}/>),
      headerLeft: (<Icon.Button name='md-arrow-back' backgroundColor="transparent" color={Colors.pinkChicle} underlayColor={Colors.whiteCrudo} onPress={() => ourself.comprobeChanges('volver')}></Icon.Button>)
    }
  }

  state = {
    image: null,
    isLoading: false,
    isFirstLoading: true,
    sliderOneChangingConduct: false,
    sliderOneChangingTemperament: false,
    isEditingDog: false,
    newValueConductDog: [1],
    newValueTemperamentDog: [2],
    newValueAvatarDog: '',
    newValueGenderDog: 0,
    newValueNameDog: '',
    newValueAgeDog: '',
    newValueBreedDog: '',
    newValueKeyDog: ''
  }

  componentDidMount() {
    this.setNewStates()
  }

  setNewStates = () => {
    const dog = this.findDogByKey(this.props.navigation.getParam('keyDog'))
    if (dog !== undefined && dog !== null) {
      this.setState({isEditingDog: true})
      this.setState({
        newValueConductDog: [this.conductToInt(dog.conduct)]
      })
      this.setState({
        newValueTemperamentDog: [this.temperamentToInt(dog.temperament)]
      })
      this.setState({newValueNameDog: dog.name})
      this.setState({newValueAgeDog: dog.age})
      this.setState({newValueBreedDog: dog.breed})
      this.setState({
        newValueGenderDog: this.genderToInt(dog.gender)
      })
      this.setState({newValueAvatarDog: dog.avatar})
      this.setState({newValueKeyDog: dog.key})
    }
    this.setState({isFirstLoading: false})
  }

  comprobeChanges = async (textButton) => {
    const attributesDicc = this.prepareAttributes()
    if (Object.keys(attributesDicc).length != 0) {
      console.log(attributesDicc);
      switch (textButton) {

        case 'volver':
          await this.showAlert('¡Wuau!', '¿Seguro que quiere salir sin guardar?')
          break

        case 'guardar':
          this.setState({isLoading: true});
          if (this.state.isEditingDog) {
            await Fire.shared.updateAttributeDog(attributesDicc, this.state.newValueKeyDog)
          } else {
            if (Object.keys(attributesDicc).length < 6) {
              this._showSimpleAlert('¡Wuau!', 'Hay que rellenar todos los campos')
            } else {
              await Fire.shared.createNewDogWithAttributes(attributesDicc, this.state.newValueAvatarDog)
            }
          }
          this.userRequest()
          this.goToBack()
          break

        default:
          console.log('button not identify');
          break
      }
    } else {
      this.goToBack()
    }
  }

  prepareAttributes = () => {
    var attributes = {}
    if (this.state.isEditingDog) {
      const dog = this.findDogByKey(this.props.navigation.getParam('keyDog'))
      if (this.state.newValueNameDog != dog.name) 
        attributes.name = this.state.newValueNameDog
      if (this.state.newValueAgeDog != dog.age) 
        attributes.age = this.state.newValueAgeDog
      if (this.intToGender(this.state.newValueGenderDog) != dog.gender) 
        attributes.gender = this.intToGender(this.state.newValueGenderDog)
      if (this.state.newValueBreedDog != dog.breed) 
        attributes.breed = this.state.newValueBreedDog
      if (optionsTemperament[this.state.newValueTemperamentDog] != dog.temperament) 
        attributes.temperament = optionsTemperament[this.state.newValueTemperamentDog]
      if (optionsConduct[this.state.newValueConductDog] != dog.conduct) 
        attributes.conduct = optionsConduct[this.state.newValueConductDog]
    } else {
      attributes = {
        name: this.state.newValueNameDog,
        age: this.state.newValueAgeDog,
        gender: this.intToGender(this.state.newValueGenderDog),
        temperament: optionsTemperament[this.state.newValueTemperamentDog],
        conduct: optionsConduct[this.state.newValueConductDog],
        breed: this.state.newValueBreedDog
      }
    }
    return attributes
  }

  _showSimpleAlert = (title, description) => {
    Alert.alert(title, description, [
      {
        text: 'Aceptar',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  showAlert = (title, text) => {
    Alert.alert(title, text, [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Salir',
        onPress: () => {
          this.goToBack()
        }
      }
    ], {cancelable: true})
  }

  goToBack() {
    this.props.navigation.goBack(null)
  }

  _pickImage = async (keyDog) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })
    if (!result.cancelled) {
      if (keyDog != '') { //updating photo dog
        this.setState({isLoading: true})
        uploadUrl = await Fire.shared.uploadImageDogAsync(result.uri, keyDog)
        uploadUrl
          ? this.userRequest()
          : Alert.alert('¡Wuau!', 'Error al cargar la foto', [
            {
              text: 'Aceptar',
              onPress: () => {
                this.setState({isLoading: false})
              }
            }
          ], {cancelable: false})
      } else { // create new dog first
        this.setState({newValueAvatarDog: result.uri});
      }
    }
  }

  userRequest = async () => {
    const {dataUser} = await Fire.shared.getInfoUser(this.props.dataMyUser.key)
    this.props.insert_dataMyUser(dataUser)
    this.setNewStates()
    this.setState({isLoading: false})
  }

  renderImageDog(urlPhotoDog) {
    if (urlPhotoDog == '') 
      urlPhotoDog = 'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FavatarDog.jpg?alt=media&token=ee194433-edab-4ff1-8dcd-aaa5d0de072f'
    return (<Image style={styles.avatar} source={urlPhotoDog
        ? {
          uri: urlPhotoDog
        }
        : {
          uri: 'https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FavatarDog.jpg?alt=media&token=ee194433-edab-4ff1-8dcd-aaa5d0de072f'
        }}/>)
  }

  showAlertDelete = () => {
    Alert.alert('Eliminar can', '¿Seguro que desea eliminar este can?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Eliminar',
        onPress: () => this.deleteDog()
      }
    ], {cancelable: true})
  }

  deleteDog = async () => {
    await Fire.shared.deleteCompletDog(this.state.newValueKeyDog)
    this.userRequest()
    this.goToBack()
  }

  findDogByKey(keyDog) {
    return _.map(this.props.dataMyUser.dogs).find((element) => {
      return element.key === keyDog;
    })
  }

  genderToInt(gender) {
    if (gender == 'hembra') 
      return 0
    return 1
  }

  intToGender(value) {
    if (value == 0) 
      return 'hembra'
    return 'macho'
  }

  conductToInt(conduct) {
    return optionsConduct.findIndex(obj => obj === conduct);
  }

  temperamentToInt(temperament) {
    return optionsTemperament.findIndex(obj => obj === temperament);
  }

  sliderOneValuesChangeStartConduct = () => {
    this.setState({sliderOneChangingConduct: true})
  }

  sliderOneValuesChangeConduct = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({newValueConductDog: newValues});
  };

  sliderOneValuesChangeFinishConduct = () => {
    this.setState({sliderOneChangingConduct: false});
  };

  sliderOneValuesChangeStartTemperament = () => {
    this.setState({sliderOneChangingTemperament: true});
  };

  sliderOneValuesChangeTemperament = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({newValueTemperamentDog: newValues});
  };

  sliderOneValuesChangeFinishTemperament = () => {
    this.setState({sliderOneChangingTemperament: false});
  };

  render() {
    if (this.state.isFirstLoading) {
      return <Loader loading={this.state.isLoading}/>
    }
    return (<KeyboardAwareScrollView style={styles.container} resetScrollToCoords={{
        x: 0,
        y: 0
      }}>
      <View >
        <ImageBackground source={require('../assets/images/background.png')} style={{
            width: '100%',
            height: '100%'
          }}>
          <View style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}>
            <View style={{
                marginLeft: 15
              }}>
              <TouchableHighlight width={145} height={145} activeOpacity={0.7} underlayColor='rgba(98,93,144,0)' overlayContainerStyle={{
                  backgroundColor: 'transparent'
                }} onPress={() => this._pickImage(this.state.newValueKeyDog)}>
                {this.renderImageDog(this.state.newValueAvatarDog)}
              </TouchableHighlight>
            </View>
            <View style={{
                flex: 2,
                flexDirection: 'column'
              }}>
              <Hoshi label={'Nombre del can'} value={this.state.newValueNameDog} onChangeText={(text) => {
                  this.setState({newValueNameDog: text})
                }} style={{
                  fontSize: 15,
                  marginLeft: 15,
                  marginRight: 15
                }} borderColor={Colors.pinkChicle} labelStyle={Colors.pinkChicle}/>
              <Hoshi label={'Edad del can'} value={this.state.newValueAgeDog} keyboardType={'number-pad'} onChangeText={(text) => {
                  this.setState({newValueAgeDog: text})
                }} style={{
                  fontSize: 15,
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 15
                }} borderColor={Colors.pinkChicle} labelStyle={Colors.pinkChicle}/>
            </View>
          </View>
          <SwitchSelector options={this.state.newValueGenderDog == 0
              ? [
                {
                  label: '  Hembra',
                  value: 0,
                  customIcon: <Icon name='md-female' color={Colors.background} size={25}/>
                }, {
                  label: '  Macho',
                  value: 1,
                  customIcon: <Icon name='md-male' color={Colors.background} size={25}/>
                }
              ]
              : [
                {
                  label: '  Macho',
                  value: 1,
                  customIcon: <Icon name='md-male' color={Colors.background} size={25}/>
                }, {
                  label: '  Hembra',
                  value: 0,
                  customIcon: <Icon name='md-female' color={Colors.background} size={25}/>
                }
              ]
} buttonColor={Colors.pinkChicle} style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 30
            }} onPress={value => this.setState({newValueGenderDog: value})}/>
          <View style={styles.sliders}>
            <View style={styles.sliderOne}>
              <Text style={styles.text}>Temperamento:
              </Text>
              <Text style={[
                  styles.text, this.state.sliderOneChangingTemperament && {
                    color: Colors.pinkChicle
                  }
                ]}>
                {optionsTemperament[this.state.newValueTemperamentDog]}
              </Text>
            </View>
            <MultiSlider min={0} max={4} values={this.state.newValueTemperamentDog} sliderLength={280} onValuesChangeStart={this.sliderOneValuesChangeStartTemperament} onValuesChange={this.sliderOneValuesChangeTemperament} onValuesChangeFinish={this.sliderOneValuesChangeFinishTemperament} selectedStyle={{
                backgroundColor: 'gold'
              }} unselectedStyle={{
                backgroundColor: Colors.background
              }} containerStyle={{
                height: 40
              }} trackStyle={{
                height: 10,
                backgroundColor: Colors.background
              }} touchDimensions={{
                height: 40,
                width: 40,
                borderRadius: 20,
                slipDisplacement: 40
              }} customMarker={CustomMarker1}/>
            <View style={styles.sliderOne}>
              <Text style={styles.text}>Conducta:
              </Text>
              <Text style={[
                  styles.text, this.state.sliderOneChangingConduct && {
                    color: Colors.pinkChicle
                  }
                ]}>
                {optionsConduct[this.state.newValueConductDog]}
              </Text>
            </View>
            <MultiSlider min={0} max={2} values={this.state.newValueConductDog} sliderLength={280} onValuesChangeStart={this.sliderOneValuesChangeStartConduct} onValuesChange={this.sliderOneValuesChangeConduct} onValuesChangeFinish={this.sliderOneValuesChangeFinishConduct} selectedStyle={{
                backgroundColor: 'gold'
              }} unselectedStyle={{
                backgroundColor: Colors.background
              }} containerStyle={{
                height: 40
              }} trackStyle={{
                height: 10,
                backgroundColor: Colors.background
              }} touchDimensions={{
                height: 40,
                width: 40,
                borderRadius: 20,
                slipDisplacement: 40
              }} customMarker={CustomMarker2}/>
          </View>
          <Hoshi style={{
              fontSize: 15,
              marginLeft: 15,
              marginRight: 15,
              marginTop: 30,
              flex: 1
            }} label={'Raza del can'} value={this.state.newValueBreedDog} onChangeText={(text) => {
              this.setState({newValueBreedDog: text})
            }} borderColor={Colors.pinkChicle} labelStyle={Colors.pinkChicle}></Hoshi>
          {
            this.state.isEditingDog
              ? <AwesomeButtonRick type="secondary" style={{
                    alignSelf: 'center',
                    marginTop: 50,
                    marginBottom: 40
                  }} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this.showAlertDelete()}>
                  Eliminar can
                </AwesomeButtonRick>
              : null
          }
          <Loader loading={this.state.isLoading}/>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>)
  }
}

const newValueTemperamentDogtateToProps = state => {
  return {dataMyUser: state.dataMyUser}
}

export default connect(newValueTemperamentDogtateToProps, actions)(DogScreen)

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteCrudo,
    height: '100%',
    flex: 1
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: Colors.whiteCrudo,
    marginBottom: 20,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 10
  },
  sliders: {
    marginTop: 40,
    alignItems: 'center'
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: 16
  },
  title: {
    fontSize: 30
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
