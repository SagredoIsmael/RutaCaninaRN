import {Ionicons} from "@expo/vector-icons"
import React from "react"
import Colors from "../constants/Colors"
import moment from 'moment'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {showMessage, hideMessage} from 'react-native-flash-message'
import ListAssistans from './Modals/ListAssistans'
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
    isOpenListAssistans: false
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
          this.setState({isOpenListAssistans: true});
        }}>
        {this.renderIcon("ios-people-outline")}
      </TouchableHighlight>
    </View>)
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

  _pressDismissAssistantsList = () => {
    this.setState({isOpenListAssistans: false})
  }

  render() {
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
        <ListAssistans isOpenListAssistans={this.state.isOpenListAssistans} clickDismiss={this._pressDismissAssistantsList}/>
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
