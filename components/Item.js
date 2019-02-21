import {Ionicons} from "@expo/vector-icons"
import React from "react"
import Colors from "../constants/Colors"
import moment from 'moment'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Dialog, {DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'
import {showMessage, hideMessage} from 'react-native-flash-message'

import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  Button,
  TouchableOpacity,
  TouchableHighlight
} from "react-native"

const profileImageSize = 36
const padding = 12

class Item extends React.Component {
  state = {
    isSubscribe: false,
    defaultAnimationDialog: false
  }

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({width, height})
      });
    }
  }

  goToProfile = () => {
    this.props.nav.navigate("Profile", {keyUser: this.props.keyCreator});
  }

  renderHeader() {
    return (<View style={[styles.row, styles.padding]}>
      <View style={styles.row}>
        <Image style={styles.avatar} source={{
            uri: this.props.imageCreator
          }}/>
        <Text style={styles.text}>{this.props.nameCreator}</Text>
      </View>
      {this.renderIcon("ios-more")}
    </View>)
  }

  renderIconBar() {
    return (<View style={styles.row}>
      <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => {
          this._pressSubscribe()
        }}>
        {
          this.props.assistants
            ? this.renderIcon("ios-happy-outline")

            : this.renderIcon("ios-person-add-outline")

        }
      </TouchableHighlight>

      <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={this._pressChat}>
        {this.renderIcon("ios-chatbubbles-outline")}
      </TouchableHighlight>

      <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={this._pressMap}>
        {this.renderIcon("ios-send-outline")}
      </TouchableHighlight>

      <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => {
          this.setState({defaultAnimationDialog: true});
        }}>
        {this.renderIcon("ios-people-outline")}
      </TouchableHighlight>
    </View>)
  }

  renderDialogAssistants() {
    return (<Dialog onDismiss={() => {
        this.setState({defaultAnimationDialog: false});
      }} width={0.9} visible={this.state.defaultAnimationDialog} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} dialogTitle={<DialogTitle
      title = "Asistentes" onTouchOutside = {
        () => {
          this.setState({defaultAnimationDialog: false});
        }
      }
      style = {{
                backgroundColor: '#F7F7F8',
              }}
      hasTitleBar = {
        false
      }
      align = "center"
      />} footer={<DialogFooter> < DialogButton text = "OK" bordered = "bordered" onPress = {
        () => {
          this.setState({defaultAnimationDialog: false});
        }
      }
      key = "button-2" /> </DialogFooter>}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        <ImageBackground source={require("../assets/images/background.png")} style={{
            width: "100%"
          }}>

          <Text>Default Animation</Text>
          <Text>No onTouchOutside handler. will not dismiss when touch overlay.</Text>
        </ImageBackground>
      </DialogContent>
    </Dialog>)
  }

  renderBarOptions() {
    return (<View style={styles.paddingView}>

      {this.renderIconBar()}

      <Text style={styles.text}>{this.props.title}</Text>
      <View style={styles.rowDate}>
        {
          this.props.date != ''
            ? <Text style={styles.time}>{moment(this.props.date, 'DD-MM-YYYY').format("dddd DD MMM")}
              </Text>
            : null
        }
        {
          this.props.time != ''
            ? <Text style={styles.time}>
                a las {this.props.time}{' '}
              </Text>
            : null
        }
        {
          this.props.duration != ''
            ? <Text style={styles.time}>
                ({this.props.duration})
              </Text>

            : null
        }
      </View>
      <Text style={styles.subtitle}>{this.props.description}</Text>
    </View>)
  }

  renderIcon(name) {
    return (<Ionicons style={{
        marginRight: 5
      }} name={name} size={40} color={Colors.pinkChicle}/>)
  }

  _pressSubscribe = () => {
    if (this.props.assistants) {
      if (this.props.assistants[this.props.keyUser] != null) {
        showMessage({message: "Ya no asistes a la ruta", type: "danger", floating: true})
      } else {
        showMessage({message: "¡Te has apuntado a la ruta!", type: "success", floating: true})
      }
    } else {
      showMessage({message: "¡Te has apuntado a la ruta!", type: "success", floating: true})
    }
  }

  _pressChat = () => {
    console.log('eeeeee');
  }

  _pressMap = () => {
    console.log('eeeeee');
  }

  _pressAssistants = () => {
    this.setState({visible: true});

  }

  render() {
    // Reduce the name to something
    const imgW = this.props.imageWidth || this.state.width;
    const imgH = this.props.imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    var esLocale = require('moment/locale/es');
    moment.locale('es', esLocale);

    return (<View>
      <ImageBackground source={require("../assets/images/background.png")} style={{
          width: "100%"
        }}>
        <View style={{
            marginTop: 10
          }}>
          <TouchableHighlight width={145} height={145} activeOpacity={0.7} underlayColor="rgba(98,93,144,0)" overlayContainerStyle={{
              backgroundColor: "transparent"
            }} onPress={() => this.goToProfile()}>

            {this.renderHeader()}

          </TouchableHighlight>
        </View>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image resizeMode="contain" style={{
              backgroundColor: Colors.whiteCrudo,
              width: "98%",
              aspectRatio: aspect,
              borderRadius: 20
            }} source={{
              uri: this.props.image
            }}/>
        </View>
        {this.renderBarOptions()}
        {this.renderDialogAssistants()}
      </ImageBackground>
    </View>)
  }
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    fontSize: 15
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 10,
    marginTop: 5
  },
  time: {
    opacity: 0.9,
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowDate: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    marginTop: 5
  },
  column: {
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "center"
  },
  padding: {
    padding
  },
  paddingView: {
    padding,
    marginBottom: 10
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: Colors.whiteCrudo,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.pinkChicle,
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: "cover",
    marginRight: padding
  }
})

const mapStateToProps = state => {
  return {dataMyUser: state.dataMyUser, keyUser: state.keyUser}
}

export default connect(mapStateToProps, actions)(Item)
