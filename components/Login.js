import React, {Component} from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import Fire from "../api/Fire";
import {insertDataMyUser} from '../actions/usersActions'
import {connect} from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import {Font} from "expo";
import {Input, Button} from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("../assets/images/backgroundLoggin.jpg");

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({selected}) => {
  return (<View style={styles.selectorContainer}>
    <View style={selected && styles.selected}/>
  </View>);
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired
};

class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined,
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      name: undefined,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({georgia: require("../assets/fonts/Georgia.ttf"), regular: require("../assets/fonts/Montserrat-Regular.ttf"), light: require("../assets/fonts/Montserrat-Light.ttf")});

    this.setState({fontLoaded: true});
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({selectedCategory, isLoading: false});
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  login = async () => {
    const {email, password} = this.state;
    // Comprobe email and password
    LayoutAnimation.easeInEaseOut();
    if (this.validateEmail(email)) {
      this.setState({isEmailValid: true, isLoading: true});
      if (password.length >= 8) {
        this.setState({isPasswordValid: true, isLoading: true});
        //API call
        Fire.shared.loginUser(email, password).then(user => {
          this.props.insertDataMyUser({key: user.user.uid});
          this.setState({isLoading: false});
        }).catch(error => {
          Alert.alert("¡Wuau!", "Usuario o contraseña incorrectos", [
            {
              text: "Aceptar",
              onPress: () => this.setState({isLoading: false})
            }
          ], {cancelable: false});
        });
      } else {
        this.passwordInput.shake();
        this.setState({isLoading: false, isPasswordValid: false});
      }
    } else {
      this.emailInput.shake();
      this.setState({isLoading: false, isEmailValid: false});
    }
  };

  signUp = async () => {
    const {email, password, passwordConfirmation, name} = this.state;
    LayoutAnimation.easeInEaseOut();
    if (this.validateEmail(email)) {
      this.setState({isEmailValid: true, isLoading: true});
      if (password.length >= 8) {
        this.setState({isPasswordValid: true, isLoading: true});
        if (password == passwordConfirmation) {
          this.setState({isConfirmationValid: true, isLoading: true});
          // API call
          Fire.shared.registryUser(email, password).then(user => {
            const attributesDicc = {
              name: name
            };
            Fire.shared.updateAttributeUser(attributesDicc);
            this.props.insertDataMyUser({key: user.user.uid});
            this.setState({isLoading: false});
          }).catch(error => {
            Alert.alert("¡Wuau!", "Este email ya está registrado", [
              {
                text: "Aceptar",
                onPress: () => this.setState({isLoading: false})
              }
            ], {cancelable: false});
          });
        } else {
          this.confirmationInput.shake();
          this.setState({isLoading: false, isConfirmationValid: false});
        }
      } else {
        this.passwordInput.shake();
        this.setState({isLoading: false, isPasswordValid: false});
      }
    } else {
      this.emailInput.shake();
      this.setState({isLoading: false, isEmailValid: false});
    }
  };

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
      name
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    return (<View style={styles.container}>
      <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
        {
          this.state.fontLoaded
            ? (<View>
              <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior="position">
                <View style={styles.titleContainer}>
                  <View style={{
                      flexDirection: "row"
                    }}>
                    <Text style={styles.titleText}>RUTA</Text>
                  </View>
                  <View style={{
                      marginTop: -10,
                      marginLeft: 10
                    }}>
                    <Text style={styles.titleText}>CANINA</Text>
                  </View>
                </View>
                <View style={{
                    flexDirection: "row"
                  }}>
                  <Button disabled={isLoading} clear="clear" activeOpacity={0.7} onPress={() => this.selectCategory(0)} containerStyle={{
                      flex: 1
                    }} titleStyle={[
                      styles.CategoryText, isLoginPage && styles.selectedCategoryText
                    ]} title={"Inicia sesión"}/>
                  <Button disabled={isLoading} clear="clear" activeOpacity={0.7} onPress={() => this.selectCategory(1)} containerStyle={{
                      flex: 1
                    }} titleStyle={[
                      styles.CategoryText, isSignUpPage && styles.selectedCategoryText
                    ]} title={"Regístrate"}/>
                </View>
                <View style={styles.rowSelector}>
                  <TabSelector selected={isLoginPage}/>
                  <TabSelector selected={isSignUpPage}/>
                </View>
                <View style={styles.formContainer}>
                  <Input leftIcon={<Icon
                    name = "envelope-o"
                    color = "rgba(0, 0, 0, 0.38)"
                    size = {
                      25
                    }
                    style = {{backgroundColor: "transparent"}}
                    />} value={email} keyboardAppearance="light" autoFocus={false} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" returnKeyType="next" inputStyle={{
                      marginLeft: 10
                    }} placeholder={"Email"} containerStyle={{
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }} ref={input => (this.emailInput = input)} onSubmitEditing={() => this.passwordInput.focus()} onChangeText={email => this.setState({email})} errorMessage={isEmailValid
                      ? null
                      : "Por favor introduce un email válido"
}></Input>
                  <Input leftIcon={<SimpleIcon
                    name = "lock"
                    color = "rgba(0, 0, 0, 0.38)"
                    size = {
                      25
                    }
                    style = {{backgroundColor: "transparent"}}
                    />} value={password} keyboardAppearance="light" autoCapitalize="none" autoCorrect={false} secureTextEntry={true} returnKeyType={isSignUpPage
                      ? "next"
                      : "done"} blurOnSubmit={true} containerStyle={{
                      marginTop: 16,
                      borderBottomColor: "rgba(0, 0, 0, 0.38)"
                    }} inputStyle={{
                      marginLeft: 10
                    }} placeholder={"Contraseña"} ref={input => (this.passwordInput = input)} onSubmitEditing={(
                      ) => isSignUpPage
                      ? this.confirmationInput.focus()
                      : this.login()} onChangeText={password => this.setState({password})} errorMessage={isPasswordValid
                      ? null
                      : "La contraseña debe tener al menos 8 caracteres"
}></Input>
                  {
                    isSignUpPage && (<Input icon={<SimpleIcon
                      name = "lock"
                      color = "rgba(0, 0, 0, 0.38)"
                      size = {
                        25
                      }
                      style = {{backgroundColor: "transparent"}}
                      />} value={passwordConfirmation} secureTextEntry={true} keyboardAppearance="light" autoCapitalize="none" autoCorrect={false} keyboardType="default" returnKeyType={"next"} blurOnSubmit={true} containerStyle={{
                        marginTop: 16,
                        borderBottomColor: "rgba(0, 0, 0, 0.38)"
                      }} inputStyle={{
                        marginLeft: 10
                      }} placeholder={"Confirmar contraseña"} ref={input => (this.confirmationInput = input)} onSubmitEditing={this.signUp} onChangeText={passwordConfirmation => this.setState({passwordConfirmation})
} errorMessage={isConfirmationValid
                        ? null
                        : "Ambas contraseñas no coinciden"
}></Input>)
                  }
                  {
                    isSignUpPage && (<Input value={name} secureTextEntry={false} keyboardAppearance="light" autoCapitalize="words" autoCorrect={false} keyboardType="default" returnKeyType={"done"} blurOnSubmit={true} containerStyle={{
                        marginTop: 16,
                        borderBottomColor: "rgba(0, 0, 0, 0.38)"
                      }} inputStyle={{
                        marginLeft: 10
                      }} placeholder={"Tu nombre"} ref={input => (this.confirmationInput = input)} onSubmitEditing={this.signUp} onChangeText={name => this.setState({name})}></Input>)
                  }
                  <Button buttonStyle={styles.loginButton} containerStyle={{
                      marginTop: 32,
                      flex: 0
                    }} activeOpacity={0.8} title={isLoginPage
                      ? "LOGIN"
                      : "REGISTRAR"} onPress={isLoginPage
                      ? this.login
                      : this.signUp} titleStyle={styles.loginTextButton} loading={isLoading} disabled={isLoading}/>
                </View>
              </KeyboardAvoidingView>
            </View>)
            : (<Text>Cargando...</Text>)
        }
      </ImageBackground>
    </View>);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    insertDataMyUser: (user) => {
      dispatch(insertDataMyUser(user))
    }
  }
}

const mapStateToProps = state => {
  return {dataRoutes: state.dataRoutes, dataMyUser: state.dataMyUser};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center"
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white"
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  loginTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
  loginButton: {
    backgroundColor: "rgba(232, 147, 142, 1)",
    borderRadius: 10,
    height: 50,
    width: 200
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center"
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54
  },
  selectedCategoryText: {
    opacity: 1
  },
  titleText: {
    color: "white",
    fontSize: 30,
    fontFamily: "regular"
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  }
});
