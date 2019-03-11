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
  Button
} from "react-native"
import Colors from "../../constants/Colors"
import Item from "../Item"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

class InfoRoute extends React.Component {

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
              <Item keyCreator={this.props.routeSelect.key} imageCreator={this.props.routeSelect.image} nameCreator={this.props.routeSelect.name} title={this.props.routeSelect.title} image={this.props.routeSelect.photo} description={this.props.routeSelect.description} date={this.props.routeSelect.date} time={this.props.routeSelect.time} isHiddenOption={true} coords={this.props.routeSelect.coords} duration={this.props.routeSelect.duration}/>
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

export default InfoRoute
