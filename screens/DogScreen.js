import React from 'react';
import {connect} from 'react-redux'
import Fire from '../api/Fire'
import { Permissions, ImagePicker } from 'expo'
import BouncingPreloader from 'react-native-bouncing-preloader'
import _ from 'lodash'
import * as actions from '../actions'
import LoadingIcons from '../components/LoadingIcons.js'
import Colors from '../constants/Colors';
import {
  StyleSheet,
  Alert,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';



class DogScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('titleHeader', 'Mis canes'),
    };
  };
  state = {
    image: null,
    hasCameraPermission: null,
    isLoading:false,
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
    return (
      <Image
        style={ styles.avatar }
        source={{uri: urlPhotoDog}}
      />
    );
  }

  findDogByKey(keyDog) {
  return _.map(this.props.dataUser.dogs).find((element) => {
    return element.key === keyDog;
    })
  }

  render() {
    const { navigation } = this.props
    const dog = this.findDogByKey(navigation.getParam('keyDog'))
    return (
        <ScrollView style={styles.container}>
          {dog?
            <View>
              <TouchableHighlight  width={145} height={145} activeOpacity={0.7} underlayColor='rgba(73,182,77,1,0.9)' overlayContainerStyle={{backgroundColor: 'transparent'}} onPress={()=>this._pickImage(dog.key)}>
                {this.renderImageDog(dog.avatar)}
              </TouchableHighlight>
              {(this.state.isLoading) ? <LoadingIcons></LoadingIcons> : null }
            </View>
            :


            <Text> me quieren agregarrrrr¡¡¡¡</Text>}
        </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataUser : state.dataUser,
    keyUser : state.keyUser,
  }
}

export default connect(mapStateToProps, actions)(DogScreen)

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.pinkChicle,
    height: '100%',
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
    marginTop: 10
  },
});
