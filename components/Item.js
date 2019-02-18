import {Ionicons} from "@expo/vector-icons"
import React from "react"
import Colors from "../constants/Colors"
import moment from 'moment'
import {connect} from 'react-redux'
import * as actions from '../actions'
import {showMessage, hideMessage} from 'react-native-flash-message'
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  Button,
  TouchableHighlight
} from "react-native"

const profileImageSize = 36
const padding = 12

class Item extends React.Component {
  state = {
    isSubscribe: false
  }

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({width, height})
      });
    }

  }

  goToProfile = keyUserr => {
    this.props.nav.navigate("Profile", {keyUser: keyUserr});
  };

  render() {
    const {
      keyCreator,
      nameCreator,
      imageCreator,
      title,
      imageWidth,
      imageHeight,
      image,
      description,
      date,
      time,
      duration,
      assistants,
      keyUser
    } = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
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
            }} onPress={() => this.goToProfile(keyCreator)}>
            <Header image={{
                uri: imageCreator
              }} name={nameCreator}/>
          </TouchableHighlight>
        </View>
        <Image resizeMode="contain" style={{
            backgroundColor: Colors.whiteCrudo,
            width: "100%",
            aspectRatio: aspect,
            borderRadius: 20
          }} source={{
            uri: image
          }}/>
        <Metadata keyRoute={this.props.keyRoute} name={title} description={description} date={date} time={time} duration={duration} assistants={assistants} keyUser={keyUser}/>
      </ImageBackground>
    </View>)
  }
}

const Metadata = ({
  keyRoute,
  name,
  description,
  date,
  time,
  duration,
  assistants,
  keyUser
}) => (<View style={styles.paddingView}>
  <IconBar keyRoute={keyRoute} assistants={assistants} keyUser={keyUser}/>
  <Text style={styles.text}>{name}</Text>
  <View style={styles.rowDate}>
    {
      date != ''
        ? <Text style={styles.time}>{moment(date, 'DD-MM-YYYY').format("dddd DD MMM")}
          </Text>
        : null
    }
    {
      time != ''
        ? <Text style={styles.time}>
            a las {time}{' '}
          </Text>
        : null
    }
    {
      duration != ''
        ? <Text style={styles.time}>
            ({duration})
          </Text>

        : null
    }
  </View>
  <Text style={styles.subtitle}>{description}</Text>
</View>);

const Header = ({name, image}) => (<View style={[styles.row, styles.padding]}>
  <View style={styles.row}>
    <Image style={styles.avatar} source={image}/>
    <Text style={styles.text}>{name}</Text>
  </View>
  <Icon name="ios-more"/>
</View>);

const Icon = ({name}) => (<Ionicons style={{
    marginRight: 5
  }} name={name} size={40} color={Colors.pinkChicle}/>)

_pressSubscribe = (keyRoute, assistants, keyUser) => {
  if (assistants) {
    if (assistants[keyUser] != null) {
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

_pressSave = () => {
  console.log('eeeeee');
}

const IconBar = ({keyRoute, assistants, keyUser}) => (<View style={styles.row}>
  <TouchableHighlight onPress={() => {
      this._pressSubscribe(keyRoute, assistants, keyUser)
    }}>
    {
      assistants
        ? <Icon name="ios-happy-outline"/>
        : <Icon name="ios-person-add-outline"/>
    }
  </TouchableHighlight>
  <TouchableHighlight onPress={this._pressChat}>
    <Icon name="ios-chatbubbles-outline"/>
  </TouchableHighlight>
  <TouchableHighlight onPress={this._pressMap}>
    <Icon name="ios-send-outline"/>
  </TouchableHighlight>
  <TouchableHighlight onPress={this._pressSave}>
    <Icon name="ios-people-outline"/>
  </TouchableHighlight>
</View>);

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
