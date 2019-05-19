import React from "react"
import {connect} from "react-redux"
import {closeNameUserModal} from '../../actions/modalsActions'
import {insertDataNameUser} from '../../actions/usersActions'
import {Hoshi} from 'react-native-textinput-effects'
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
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Colors from "../../constants/Colors"
import Dialog, {DialogButton, DialogTitle, DialogFooter, DialogContent, ScaleAnimation} from 'react-native-popup-dialog'

class NameUserModal extends React.Component {

  state = {
    newValueNameUser: ''
  }

  componentDidMount() {
    this.setState({newValueNameUser: this.props.dataMyUser.name})
  }

  componentWillMount(){
  }

  _updateNameUser = () => {
    this.props.insertDataNameUser(this.state.newValueNameUser)
    this.props.closeNameUserModal()
  }

  _buttonsDialogModal() {
    return (
      <View>
        <AwesomeButtonRick type="secondary" style={{
              alignSelf: 'center',
              marginTop: 0,
              marginBottom: 15
            }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this._updateNameUser()}>
              Actualizar
        </AwesomeButtonRick>

        <AwesomeButtonRick type="secondary" style={{
            alignSelf: 'center',
            marginTop: 0,
            marginBottom: 5
          }} height={35} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.whiteCrudo} onPress={value => this.props.closeNameUserModal()}>
          Cancelar
        </AwesomeButtonRick>
      </View>)
  }

  render() {
    const { isOpen } = this.props.nameUserModal

    return (<Dialog onDismiss={() => {}} width={0.8} style={{
        backgroundColor: '#F7F7F8'
      }} visible={isOpen} actionsBordered="actionsBordered" dialogAnimation={new ScaleAnimation()}
      dialogTitle={<DialogTitle
      title = "Actualizar nombre de usuario"
      style = {{
                  backgroundColor: '#F7F7F8',
                }}
      hasTitleBar = {
        false
      }
      align = "center"
      />}
      footer={this._buttonsDialogModal()}
      >
      <DialogContent style={{
          backgroundColor: '#F7F7F8'
        }}>
        <ScrollView>
          <ImageBackground source={require("../../assets/images/background.png")} style={{
              width: "100%"
            }}>
            <Hoshi label={''} value={this.state.newValueNameUser} onChangeText={(text) => {
                this.setState({newValueNameUser: text})
              }} style={{
                fontSize: 15,
                marginLeft: 15,
                marginRight: 15
              }} borderColor={Colors.pinkChicle} labelStyle={Colors.pinkChicle}/>
          </ImageBackground>
        </ScrollView>
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
})

const mapDispatchToProps = dispatch => {
  return {
    insertDataNameUser: (name) => {
      dispatch(insertDataNameUser(name))
    },
    closeNameUserModal: () => {
      dispatch(closeNameUserModal())
    }
  }
}

const mapStateToProps = state => {
  return {state: state, dataMyUser: state.dataMyUser, nameUserModal: state.modals.nameUserModal}
}

export default connect(mapStateToProps, mapDispatchToProps)(NameUserModal)
