import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  Button
} from "react-native"
import {connect} from "react-redux"
import * as actions from "../../actions"
import Colors from "../../constants/Colors"
import Item from "../Item"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

class InfoRoute extends React.Component {

  _pressRoute = () => {
    this.props.insert_scrollPositionList({keyRoute: this.props.routeSelect.key})
    this.props.nav.navigate("RutasStack")
    if (this.props.clickDismiss != null) {
      this.props.clickDismiss()
    }
  }

  render() {
    if (this.props.routeSelect != null) {
      return (<Dialog onDismiss={() => {}} width={0.8} style={{
          backgroundColor: '#F7F7F8'
        }} visible={this.props.isOpenInfoRoute} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} footer={<View> < Button title = "Cerrar" color = {
          Colors.verdeOscuro
        }
        align = "center" onPress = {
          () => this.props.clickDismiss()
        } /> < /View>}>
        <DialogContent style={{
            backgroundColor: '#F7F7F8'
          }}>
          <ScrollView>
            <ImageBackground source={require("../../assets/images/background.png")} style={{
                width: "100%"
              }}>
              < TouchableHighlight underlayColor="rgba(98,93,144,0)" onPress={() => this._pressRoute()}>
                <Item keyCreator={this.props.routeSelect.keyCreator} imageCreator={this.props.routeSelect.imageCreator} nameCreator={this.props.routeSelect.nameCreator} title={this.props.routeSelect.name} image={this.props.routeSelect.image} description={this.props.routeSelect.description} date={this.props.routeSelect.date} time={this.props.routeSelect.time} isHiddenOption={true} coords={this.props.routeSelect.coords} duration={this.props.routeSelect.duration}/>
              </TouchableHighlight>
            </ImageBackground>
          </ScrollView>
        </DialogContent>
      </Dialog>)
    }
    return <View></View>
  }
}

const styles = StyleSheet.create({
  avatarDogs: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: Colors.verdeOscuro,
    marginTop: 10,
    alignSelf: "center",
    position: "relative"
  }
});

const mapStateToProps = state => {
  return {scrollPositionList: state.scrollPositionList};
};

export default connect(mapStateToProps, actions)(InfoRoute);
