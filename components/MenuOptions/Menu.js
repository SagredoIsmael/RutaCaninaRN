import React, { Component } from 'react';
import {
  Text,
  Button,
  Alert,
} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import View from 'react-native-view'
import BouncyDrawer from 'react-native-bouncy-drawer'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import Fire from '../../api/Fire'
import Colors from '../../constants/Colors';

class Menu extends Component {

  renderItem = (text, color, iconName) => (
    <View smp row vcenter>
      <View lgpr>
        <MAIcon name={iconName} color={color} size={26}/>
      </View>
      <Button style={{ fontSize: 16, color, fontWeight: '600' }}
         title={text}
         onPress={this.LogOutOnButtonPress}
       />
    </View>
  )

  renderItemLogOut = (text, color, iconName) => (
    <View smp row vcenter>
      <View lgpr>
        <MAIcon name={iconName} color={color} size={26}/>
      </View>
      <Button style={{ fontSize: 16, color, fontWeight: '600' }}
         title={text}
         onPress={this.LogOutOnButtonPress}
       />
    </View>
  )

  LogOutOnButtonPress = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Esta seguro?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Aceptar', onPress: () => this.logOut() },
      ],
      { cancelable: false }
    )
  }

  logOut = () => {
    this.props.insert_user('')
    Fire.shared.logOutUser()
  }

  renderContent = () => (
    <View flex hcenter mdpr style={{ backgroundColor: '#3F3C4C' }}>
      <View flex>
        <View style={{ flex: 1 }} />
        {this.renderItem("PROFILE", "#fff", "person-outline")}
        {this.renderItem("FRIENDS", "#fff", "people-outline")}
        {this.renderItem("ACTIVITY", "#2FCACE", "public")}
        <View mdp/>
        {this.renderItemLogOut("DESCONECTAR", "#fff", "settings")}
        <View style={{ flex: 3 }} />
      </View>
    </View>
  )


  render() {
    return (
        <BouncyDrawer
          willOpen={() => console.log('will open')}
          didOpen={() => console.log('did open')}
          willClose={() => console.log('will close')}
          didClose={() => console.log('did close')}
          title="Mi perfil"
          titleStyle={{ color: '#fff', fontFamily: 'Helvetica Neue', fontSize: 20, marginLeft: -3 }}
          closedHeaderStyle={{ backgroundColor: '#859a9b' }}
          defaultOpenButtonIconColor="#fff"
          defaultCloseButtonIconColor="#fff"
          renderContent={this.renderContent}
          openedHeaderStyle={{ backgroundColor: '#3F3C4C' }}
          openButtonPosition='left'
          closeButtonPosition='left'
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    keyUser : state.keyUser,
    dataUser : state.dataUser,
  }
}

export default connect(mapStateToProps, actions)(Menu)
