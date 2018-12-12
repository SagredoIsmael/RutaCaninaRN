import React from 'react';
import {connect} from 'react-redux'
import Fire from '../api/Fire'
import { Permissions, ImagePicker } from 'expo'
import _ from 'lodash'
import * as actions from '../actions'
import Loader from '../components/Loader'
import Colors from '../constants/Colors'
import {Hoshi, Makiko } from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/Ionicons'
import SwitchSelector from 'react-native-switch-selector'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker1 from '../components/CustomMarker1'
import CustomMarker2 from '../components/CustomMarker2'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
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
  TouchableHighlight,
  BackHandler,
} from 'react-native';

const optionsConduct = ['granuja y sinvergüenza', 'torbellino', 'pasota total']
const optionsTemperament = ['muy dulce', 'apacible y amigable', 'independiente y libre', 'prudente y pedante', 'alterable e irritable']

class DogScreen extends React.Component {
  static ourself = null;
  constructor() {
    super();
    ourself = this;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('titleHeader', 'Mis canes'),
      headerTitleStyle: {
        color: Colors.verdeOscuro,
        fontSize: 28
      },
      headerStyle: {
        backgroundColor: Colors.background
      },
      headerRight: (
      <Button
        onPress={() => ourself.comprobeChanges()}
        title='Guardar'
        color= {Colors.azuliOS}
        />
      ),
    }
  }


  state = {
    image: null,
    hasCameraPermission: null,
    isLoading:false,
    sliderOneChangingConduct: false,
    sliderOneChangingTemperament: false,
    isEditingDog:false,
    newValueConductDog: [1],
    newValueTemperamentDog: [2],
    newValueAvatarDog: '',
    newValueGender:0,
  }

  componentDidMount() {
    const dog = this.findDogByKey(this.props.navigation.getParam('keyDog'))
    if (dog !== undefined && dog !== null){
      this.setState({ isEditingDog: true })
      this.setState({ newValueConductDog: [this.conductToInt(dog.conduct)] })
      this.setState({ newValueTemperamentDog: [this.temperamentToInt(dog.temperament)] })
      this.setState({ newValueNameDog: dog.name })
      this.setState({ newValueAgeDog: dog.age })
      this.setState({ newValueBreedDog: dog.breed })
      this.setState({ newValueGender: this.genderToInt(dog.gender) })
      this.setState({ newValueAvatarDog: dog.avatar })
      this.setState({ newValueKeyDog: dog.key })
    }
  }


  comprobeChanges = () => {
     this.showAlert('¿Seguro que quiere salir sin guardar?')
  }

  showAlert = (title,  text) => {
    Alert.alert(
      title,
      text,
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Salir', onPress: () => this.props.navigation.goBack(null)},
      ],
      { cancelable: true }
    )
  }

  _pickImage = async (keyDog) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })
      if (!result.cancelled) {
      this.setState({ isLoading: true });
       uploadUrl = await Fire.shared.uploadImageDogAsync(result.uri, keyDog)
       uploadUrl? this.userRequest() :   Alert.alert(
           '¡Wuau!',
           'Error al cargar la foto', [ {text: 'Aceptar'}, ],
           { cancelable: false })
      }
  }

  userRequest = async () => {
      const { dataUser } = await Fire.shared.getInfoMyUser()
      this.props.insert_dataUser(dataUser)
      this.setState({ isLoading: false });
  }

  renderImageDog(urlPhotoDog) {
    if (urlPhotoDog == '') urlPhotoDog = 'https://www.avatarys.com/var/resizes/Cool-Avatars/Animal-Avatars/cool-dog-avatar-by-avatarys.jpg?m=1436714277'
    return (
      <Image
        style={ styles.avatar }
        source={{uri: urlPhotoDog}}
      />
    )
  }

  findDogByKey(keyDog) {
  return _.map(this.props.dataUser.dogs).find((element) => {
    return element.key === keyDog;
    })
  }

  genderToInt(gender){
    if (gender == 'hembra') {return 0}
    return 1
  }

  conductToInt(conduct){
    return optionsConduct.findIndex(obj => obj === conduct);
  }

  temperamentToInt(temperament){
    return optionsTemperament.findIndex(obj => obj === temperament);
  }

  sliderOneValuesChangeStartConduct = () => {
    this.setState({
      sliderOneChangingConduct: true,
    });
  };

  sliderOneValuesChangeConduct = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      newValueConductDog: newValues,
    });
  };

  sliderOneValuesChangeFinishConduct = () => {
    this.setState({
      sliderOneChangingConduct: false,
    });
  };

  sliderOneValuesChangeStartTemperament = () => {
    this.setState({
      sliderOneChangingTemperament: true,
    });
  };

  sliderOneValuesChangeTemperament = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      newValueTemperamentDog: newValues,
    });
  };

  sliderOneValuesChangeFinishTemperament = () => {
    this.setState({
      sliderOneChangingTemperament: false,
    });
  };


  render() {
    return (
        <ScrollView style={styles.container}>
          <ImageBackground
            source={require('../assets/images/background.png')}
            style={{width: '100%', height: '100%'}}>
            <View>
              <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', marginTop:10}}>
                <View style={{marginLeft: 15}}>
                  <TouchableHighlight  width={145} height={145} activeOpacity={0.7} underlayColor='rgba(98,93,144,0)' overlayContainerStyle={{backgroundColor: 'transparent'}} onPress={()=>this._pickImage(this.state.newValueKeyDog)}>
                    {this.renderImageDog(this.state.newValueAvatarDog)}
                  </TouchableHighlight>
                </View>
                <View style={{flex: 2, flexDirection: 'column'}}>
                  <Hoshi
                    label={'Nombre del can'}
                    value={this.state.newValueNameDog}
                    style={{fontSize: 15, marginLeft: 15, marginRight: 15}}
                    borderColor={'#db786d'}
                    labelStyle={'#db786d'}
                  />
                  <Hoshi
                    label={'Edad del can'}
                    value={this.state.newValueAgeDog}
                    style={{fontSize: 15, marginLeft: 15, marginRight: 15, marginTop:15}}
                    borderColor={'#db786d'}
                    labelStyle={'#db786d'}
                  />
                </View>
              </View>
              <SwitchSelector options={[
                  { label: '  Hembra', value: 'hembra', customIcon: <Icon name='md-female' color={Colors.background} size={25} />   },
                  { label: '  Macho', value: 'macho', customIcon: <Icon name='md-male' color={Colors.background} size={25} />   },
              ]} buttonColor={'#db786d'} style={{marginLeft: 10, marginRight: 10, marginTop:30}} initial={this.genderToInt(this.state.newValueGender)} onPress={value => console.log(`Call onPress with value: ${value}`)} />

              <View style={styles.sliders}>
                <View style={styles.sliderOne}>
                  <Text style={styles.text}>Temperamento: </Text>
                  <Text
                    style={[
                      styles.text,
                      this.state.sliderOneChangingTemperament && { color: '#db786d' },
                    ]}
                  >
                    {optionsTemperament[this.state.newValueTemperamentDog]}
                  </Text>
                </View>
                <MultiSlider
                  min={0}
                  max={4}
                  values={this.state.newValueTemperamentDog}
                  sliderLength={280}
                  onValuesChangeStart={this.sliderOneValuesChangeStartTemperament}
                  onValuesChange={this.sliderOneValuesChangeTemperament}
                  onValuesChangeFinish={this.sliderOneValuesChangeFinishTemperament}
                  selectedStyle={{
                    backgroundColor: 'gold',
                  }}
                  unselectedStyle={{
                    backgroundColor: Colors.background,
                  }}
                  containerStyle={{
                    height: 40,
                  }}
                  trackStyle={{
                    height: 10,
                    backgroundColor: Colors.background  ,
                  }}
                  touchDimensions={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 40,
                  }}
                  customMarker={CustomMarker1}
                />
              <View style={styles.sliderOne}>
                <Text style={styles.text}>Conducta: </Text>
                <Text
                  style={[
                    styles.text,
                    this.state.sliderOneChangingConduct && { color: '#db786d' },
                  ]}
                >
                  {optionsConduct[this.state.newValueConductDog]}
                </Text>
              </View>
              <MultiSlider
                min={0}
                max={2}
                values={this.state.newValueConductDog}
                sliderLength={280}
                onValuesChangeStart={this.sliderOneValuesChangeStartConduct}
                onValuesChange={this.sliderOneValuesChangeConduct}
                onValuesChangeFinish={this.sliderOneValuesChangeFinishConduct}
                selectedStyle={{
                  backgroundColor: 'gold',
                }}
                unselectedStyle={{
                  backgroundColor: Colors.background,
                }}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 10,
                  backgroundColor: Colors.background  ,
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}
                customMarker={CustomMarker2}
              />
              </View>
              <Hoshi
                style={{fontSize: 15, marginLeft: 15, marginRight: 15, marginTop:30, flex:1}}
                label={'Raza del can'}
                value={this.state.newValueBreedDog}
                borderColor={'#db786d'}
                labelStyle={'#db786d'}
              />
            {this.state.isEditingDog? <AwesomeButtonRick type="secondary" style={{alignSelf:'center', marginTop:50, marginBottom:40}} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => console.log('Has clickado eliminar can')}>Eliminar can</AwesomeButtonRick> : null }
            <Loader loading={this.state.isLoading} color={Colors.verdeOscuro} />
            </View>
          </ImageBackground>
        </ScrollView>
    );
  }
}

const newValueTemperamentDogtateToProps = state => {
  return {
    dataUser : state.dataUser,
    keyUser : state.keyUser,
  }
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
    marginBottom:20,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 10,
  },
  sliders: {
    marginTop:40,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: 16
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
