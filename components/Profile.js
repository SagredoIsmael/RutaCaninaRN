import React, {Component} from "react"
import {Permissions, ImagePicker, Font, Constants} from "expo"
import {connect} from "react-redux"
import {resetDataMyUser, insertDataMyUser} from '../actions/usersActions'
import {openNameUserModal} from '../actions/modalsActions'
import Fire from "../api/Fire"
import Icon from "react-native-vector-icons/Ionicons"
import IconFoundation from "react-native-vector-icons/Foundation"
import _ from "lodash"
import {Avatar, Button} from "react-native-elements"
import Loader from "./Modals/Loader"
import InfoDog from "./Modals/InfoDogModal"
import NameUserModal from "./Modals/NameUserModal"
import {
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Dimensions
} from "react-native";
import Colors from "../constants/Colors"

const screenHeight = Dimensions.get("window").height

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    image: null,
    hasCameraPermission: false,
    isLoading: false,
    fontLoaded: false,
    dogSelect: null,
    isOpenInfoDog: false
  };

  async componentDidMount() {
    await Font.loadAsync({georgia: require("../assets/fonts/Georgia.ttf"), regular: require("../assets/fonts/Montserrat-Regular.ttf"), light: require("../assets/fonts/Montserrat-Light.ttf"), bold: require("../assets/fonts/Montserrat-Bold.ttf")});
    this.setState({fontLoaded: true})
  }

  userRequest = async () => {
    const {dataUser} = await Fire.shared.getInfoUser(this.props.dataMyUser.key);
    this.props.insertDataMyUser(dataUser);
    this.setState({isLoading: false})
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  }

  renderImageProfile() {
    var image = null;
    if (this.props.isMyProfile) {
      image = this.props.dataMyUser.image;
    } else {
      image = this.props.dataUser.image;
    }
    return <Image style={styles.avatar} source={{
        uri: image
      }}/>;
  }

  renderListCards() {
    var dogs = null;
    if (this.props.isMyProfile) {
      dogs = this.props.dataMyUser.dogs;
    } else {
      dogs = this.props.dataUser.dogs;
    }
    return _.map(dogs, (user, index) => {
      return this.renderCard(user, index);
    })
  }

  _openNameUserModal = () => {
    this.props.isMyProfile ? this.props.openNameUserModal() : null
  }

  renderTitleUser() {
    return (
      <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => this._openNameUserModal()} style={{
        flex: 1,
        marginTop: 40,
        justifyContent: "center"
      }} >
        <Text style={{
            fontFamily: "bold",
            fontSize: 25,
            color: Colors.verdeOscuro,
            marginLeft: -15
          }}>
          {this.props.isMyProfile? this.props.dataMyUser.name : this.props.dataUser.name}
        </Text>
    </TouchableHighlight>)
  }

  renderCard(dog, index) {
    const {name, avatar} = dog;
    return (<View key={index} style={{
        height: 60,
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: Colors.profilegreen,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row"
      }}>
      <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => this.infoDogs(dog)} style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center"
        }}>
        <View style={{
            flex: 2,
            flexDirection: "row",
            alignItems: "center"
          }}>
          <View style={{
              marginLeft: 15
            }}>
            <Avatar small="small" rounded={true} source={avatar
                ? {
                  uri: avatar
                }
                : {
                  uri: (urlPhotoDog = "https://firebasestorage.googleapis.com/v0/b/rutacaninarn.appspot.com/o/utils%2FavatarDog.png?alt=media&token=821fdff6-ad3d-4547-b7cf-2dd21230f0df")
                }
} activeOpacity={0.7}/>
          </View>
          <Text style={{
              fontFamily: "regular",
              fontSize: 15,
              marginLeft: 10,
              color: Colors.verdeOscuro
            }}>
            {name}
          </Text>
        </View>
      </TouchableHighlight>
      {this.renderButtonSettings(dog)}
    </View>);
  }

  renderButtonSettings(dog) {
    if (this.props.isMyProfile)
      return (<TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => this.gotoDogScreen(dog.key, dog.name)}>
        <View style={{
            backgroundColor: Colors.verdeOscuro,
            width: 60,
            height: 28,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            flexDirection: 'row'
          }}>
          <IconFoundation name="paw" color={Colors.pinkChicle} size={20} style={{
              marginRight:5
            }}/>
          <Icon name="md-create" color="white" size={20}/>
        </View>
      </TouchableHighlight>);
    }

  renderAddDogButton() {
    if (this.props.isMyProfile)
      return (<View style={{
          flex: 1,
          marginRight: 25
        }}>
        <Button title="Agregar perrete" buttonStyle={{
            height: 33,
            backgroundColor: Colors.pinkChicle,
            borderRadius: 5
          }} titleStyle={{
            fontFamily: "regular",
            fontSize: 13,
            color: "white"
          }} onPress={() => this.gotoDogScreen(null, "Nuevo can")} underlayColor="transparent"/>
      </View>);
    }

  renderTextCanes() {
    var text = "Mis canes";
    var fontSize = 20;
    if (this.props.isMyProfile) {
      if (this.props.dataMyUser.dogs) {
        if (Object.keys(this.props.dataMyUser.dogs).length === 0) {
          text = "Aún no tienes ningún can añadido";
          fontSize = 10;
        } else {
          text = "Mis canes";
        }
      }
    } else {
      if (this.props.dataUser.dogs) {
        if (Object.keys(this.props.dataUser.dogs).length === 0) {
          text = "No tiene canes añadidos";
        } else {
          text = "Sus canes";
        }
      }
    }
    return (<View style={{
        flex: 1
      }}>
      <Text style={{
          color: Colors.verdeOscuro,
          fontFamily: "regular",
          fontSize: fontSize,
          marginLeft: 25
        }}>
        {text}
      </Text>
    </View>);
  }

  renderPhotoUser() {
    if (this.props.isMyProfile)
      return (<View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <TouchableHighlight width={145} height={145} activeOpacity={0.7} underlayColor="rgba(98,93,144,0)" overlayContainerStyle={{
            backgroundColor: "transparent"
          }} onPress={() => this._pickImage()}>
          {this.renderImageProfile()}
        </TouchableHighlight>
      </View>);
    return (<View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      {this.renderImageProfile()}
    </View>);
  }

  renderButtonProfileSettings() {
    if (this.props.isMyProfile) {
      return (
        <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => this._logOut()}>
          <View style={{
              flexDirection: "row",
              marginRight: 5,
              justifyContent: "flex-end",
              top: 2,
              right: 2
            }}>
              <Icon name="md-log-out" color={Colors.pinkChicle} size={28}/>
          </View>
        </TouchableHighlight>
      )
    }
  }

  render() {
    return (<ScrollView style={styles.container}>
      <ImageBackground source={require("../assets/images/background.png")} style={{
          width: "100%",
          height: screenHeight
        }}>
        {
          this.state.fontLoaded
            ? (<ScrollView style={{
                flex: 1,
                marginBottom: 20,
                marginTop: 0
              }}>
              <View style={{
                  flex: 1,
                  flexDirection: "column",
                  backgroundColor: Colors.profilegreen,
                  borderRadius: 5,
                  alignItems: "center",
                  marginHorizontal: 10,
                  height: 250,
                  marginBottom: 10,
                  marginTop: 30
                }}>
                <View style={{
                    flex: 3,
                    flexDirection: "row"
                  }}>
                  {this.renderPhotoUser()}
                  <View style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                    {this.renderTitleUser()}
                  </View>
                  <View style={{
                      justifyContent: "flex-start",
                    }}>
                    {this.renderButtonProfileSettings()}
                  </View>
                </View>
                <View style={{
                    width: 300,
                    borderWidth: 0.5,
                    borderColor: "white",
                    marginHorizontal: 20,
                    height: 1,
                    marginVertical: 10
                  }}/>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}>
                  {this.renderTextCanes()}
                  {this.renderAddDogButton()}
                </View>
              </View>
              {this.renderListCards()}
              <Loader loading={this.state.isLoading}/>
            </ScrollView>)
            : null
        }
      </ImageBackground>
      <InfoDog isOpenInfoDog={this.state.isOpenInfoDog} clickDismiss={this._pressDismissInfoDog} dogSelect={this.state.dogSelect}/>
      <NameUserModal/>
    </ScrollView>)
  }

  _pressDismissInfoDog = () => {
    this.setState({isOpenInfoDog: false})
  }

  gotoDogScreen = (keyDog, action) => {
    this.props.nav.navigate("Dogs", {
      keyDog: keyDog,
      titleHeader: action
    })
  }

  _logOut = () => {
    Alert.alert("¡Wuau!", "¿Seguro que desea cerrar sesión?", [
      {
        text: 'Cancelar',
        style: 'cancel'
      }, {
        text: 'Cerrar sesión',
        onPress: () => {
          this._signOut()
        }
      }
    ], {cancelable: true})
  }

  _signOut = () => {
    Fire.shared.logOutUser()
    this.props.resetDataMyUser()
  }

  infoDogs = dog => {
    this.setState({isOpenInfoDog: true, dogSelect: dog})
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })
    if (!result.cancelled) {
      this.setState({isLoading: true})
      uploadUrl = await Fire.shared.uploadImageUserAsync(result.uri)
      uploadUrl
        ? this.userRequest()
        : Alert.alert("¡Wuau!", "Error al cargar la foto", [
          {
            text: "Aceptar",
            onPress: () => this.setState({isLoading: false})
          }
        ], {cancelable: false})
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteCrudo,
    height: "100%"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: Colors.verdeOscuro,
    marginBottom: 20,
    alignSelf: "center",
    position: "relative",
    marginTop: 40,
    marginLeft: 5
  },

  closeButtonContainer: {
    position: "absolute",
    top: 51,
    width: 44,
    height: 44,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  closeButton: {
    color: "white",
    textAlign: "center"
  },
  backgroundImage: {
    width: 200,
    height: 200,
    resizeMode: "cover"
  }
})

const mapDispatchToProps = dispatch => {
  return {
    resetDataMyUser: () => {
      dispatch(resetDataMyUser())
    },
    insertDataMyUser: (user) => {
      dispatch(insertDataMyUser(user))
    },
    openNameUserModal: () => {
      dispatch(openNameUserModal())
    }
  }
}

const mapStateToProps = state => {
  return {dataUser: state.dataUser, dataMyUser: state.dataMyUser}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
