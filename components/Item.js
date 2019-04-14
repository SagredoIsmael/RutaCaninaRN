import React from "react"
import Colors from "../constants/Colors"
import moment from 'moment'
import {Ionicons} from "@expo/vector-icons"
import ListAssistans from './Modals/ListAssistansModal'
import MapLocation from './Modals/MapLocationModal'
import ItemUser from './ItemUser'
import IconSubscribe from './IconsBarCell/IconSubscribe.js'
import ViewMoreText from 'react-native-view-more-text';
import Fire from "../api/Fire"
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  Platform
} from "react-native"

const profileImageSize = 36
const padding = 12

class Item extends React.Component {

  state = {
    loadingImage: false,
    isOpenListAssistans: false,
    isOpenMapLocation: false,
    isLoadingAssistants: false,
    descriptionMarker: ''
  }

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({width, height})
      });
    }
  }

  componentWillMount(){
    this._getDescriptionFromLocation()
  }

  renderIconBar() {
    return (<View style={styles.padding}>
      <View style={styles.row}>
        <IconSubscribe isLoadingSubscribe={this.state.isLoadingSubscribe} keyRoute={this.props.keyRoute} nav={this.props.nav}/>

        < TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={this._pressChat
}>
          {this.renderIcon("ios-chatbubbles")}
        </TouchableHighlight>

        <TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={this._pressMap}>
          {this.renderIcon("ios-send")}</TouchableHighlight>

        {
          this.state.isLoadingAssistants
            ? (<ActivityIndicator size="small" color={Colors.pinkChicle}/>)
            : (<TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => {
                this.requestAssistants()
              }}>
              {this.renderIcon("ios-people")}
            </TouchableHighlight>)
        }</View>
    </View>)
  }

  _getDescriptionFromLocation = async() => {
    let where = (await Expo.Location.reverseGeocodeAsync(this.props.coords))[0]

    if (Platform.OS === 'ios'){
      this.setState({descriptionMarker: where.name})
    }else{
      var streetName = where.street + ", " + where.name
      this.setState({descriptionMarker:streetName})
    }
  }

  renderBarOptions() {
    return (<View style={styles.paddingView}>
      <Text style={styles.text}>{this.props.title}</Text>
      <View style={styles.rowDate}>
        {
          this.props.date != ''
            ? <Text style={styles.time}>{moment(this.props.date, 'YYYY-MM-DD').format("dddd DD MMM")}
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
      <ViewMoreText numberOfLines={1} renderViewMore={this.renderViewMore} renderViewLess={this.renderViewLess}>
        <Text style={styles.subtitle}>{this.props.description}</Text>
      </ViewMoreText>
    </View>)
  }

  renderIcon(name) {
    return (<Ionicons style={{
        marginRight: 5
      }} name={name} size={40} color={Colors.pinkChicle}/>)
  }

  renderViewMore(onPress) {
    return (<Text style={{
        color: 'gray'
      }} onPress={onPress}>Ver más</Text>)
  }

  renderViewLess(onPress) {
    return (<Text style={{
        color: 'gray'
      }} onPress={onPress}>Ver menos</Text>)
  }

  _pressChat = () => {
    this.props.nav.navigate('ChatRouteScreen', {keyRoute :this.props.keyRoute})
  }

  _pressMap = () => {
    this.setState({isOpenMapLocation: true})
  }

  _pressDismissModals = () => {
    this.setState({isOpenListAssistans: false, isOpenMapLocation:false})
  }

  requestAssistants = async () => {
    this.setState({isLoadingAssistants: true})
    const {data} = await Fire.shared.getUserAssistants(this.props.keyRoute)
    this.setState({assistants: data, isOpenListAssistans: true, isLoadingAssistants: false})
  }

  render() {
    const imgW = this.props.imageWidth || this.state.width;
    const imgH = this.props.imageHeight || this.state.height;
    const aspect = imgW / imgH || 1

    var esLocale = require('moment/locale/es');
    moment.locale('es', esLocale);
    return (<View>
      <ImageBackground source={require("../assets/images/background.png")} style={{
          width: "100%"
        }}>
        <View style={{
            marginTop: 10
          }}>

          <ItemUser keyCreator={this.props.keyCreator} nameCreator={this.props.nameCreator} imageCreator={this.props.imageCreator} myKeyUser={this.props.myKey} nav={this.props.nav} isHiddenOption={this.props.isHiddenOption}></ItemUser>

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
            }} onLoadStart={() => this.setState({loadingImage: true})} onLoadEnd={() => {
              this.setState({loadingImage: false})
            }}></Image>
          {this.state.loadingImage && <ActivityIndicator size="small" color={Colors.pinkChicle} animating={this.state.loadingImage}/>}
        </View>
        {
          this.props.isHiddenOption
            ? null
            : this.renderIconBar()
        }
        {this.renderBarOptions()}

        <ListAssistans isOpenListAssistans={this.state.isOpenListAssistans} nav={this.props.nav} clickDismiss={this._pressDismissModals} myKeyUser={this.props.myKey} assistants={this.state.assistants}/>
        <MapLocation isOpenMapLocation={this.state.isOpenMapLocation} location={this.props.coords} descriptionMarker={this.state.descriptionMarker} clickDismiss={this._pressDismissModals} />
      </ImageBackground>
    </View>)
  }
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    fontSize: 20
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 18,
    marginTop: 5
  },
  time: {
    opacity: 0.9,
    fontSize: 16,
    color: Colors.pinkChicle,
    marginBottom: 5
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
    padding
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

export default Item
