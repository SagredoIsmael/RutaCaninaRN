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
  Button,
  Platform,
  DatePickerIOS
} from "react-native"
import {connect} from "react-redux"
import * as actions from "../../actions"
import Colors from "../../constants/Colors"
import Item from "../Item"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'


class dateModal extends React.Component {

  state = {
    dateSelected: new Date(),
  }

  _pressSelectDate = () => {
    this.props.changeValueDate("date", this.state.dateSelected)
    this.props.clickDismiss()
  }

  componentWillMount(){
    if (Platform.OS === 'ios') this.setState({ isIOS: true })
  }

  _buttonsDialogModal() {
    return (<View>
      <Button title="Seleccionar" color={Colors.verdeOscuro} align="center" onPress={() => this._pressSelectDate()}/>
      </View>)
  }

  render() {
    return (<Dialog onDismiss={() => {}} width={1} onTouchOutside={() => this.props.clickDismiss()} style={{
        backgroundColor: '#F7F7F8'
      }} visible={this.props.isOpenDateModal} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()} footer={this._buttonsDialogModal()}>
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        {this.state.isIOS? (  <DatePickerIOS
        date={new Date()}
        onDateChange={date => this.setState({ dateSelected: date })}
        minuteInterval={15}
        minimumDate={new Date()}
        mode={"date"}
      />) : (null)}


      </DialogContent>
    </Dialog>)
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

export default connect(mapStateToProps, actions)(dateModal);
