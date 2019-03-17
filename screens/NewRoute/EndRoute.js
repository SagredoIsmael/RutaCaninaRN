import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import {copilot, walkthroughable, CopilotStep} from '@okgrow/react-native-copilot'
import TooltipCopilot from '../../components/TooltipComponent/TooltipCopilot'
import Fire from "../../api/Fire"
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Item from "../../components/Item"
import Loader from '../../components/Modals/Loader'
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native'

const WalkthroughableView = walkthroughable(View)

export class EndRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    secondStepActive: true,
    isLoading: false,
    isEditingRoute: false
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange)
    this.props.onRef(this)
    this.userRequest()
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  activateHelper = () => {
    this.props.start()
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  userRequest = async () => {
    const {dataUser} = await Fire.shared.getInfoUser(this.props.dataMyUser.key)
    this.props.insert_dataMyUser(dataUser)
  }

  comprobeChanges = async () => {

    if (this.props.dataNewRoute.title == '') {
      this._showSimpleAlert('¡Wuau!', 'El nombre de la ruta es un campo obligatorio')
    } else {
      if (this.props.dataNewRoute.date == '') {
        this._showSimpleAlert('¡Wuau!', 'La fecha de la ruta es un campo obligatorio')
      } else {
        if (this.props.dataNewRoute.time == '') {
          this._showSimpleAlert('¡Wuau!', 'La hora de la ruta es un campo obligatorio')
        } else {
          if (this.props.dataNewRoute.title == '') {
            this._showSimpleAlert('¡Wuau!', 'La descripción la ruta es un campo obligatorio')
          } else {
            if (this.props.dataNewRoute.coords.length == 0) {
              this._showSimpleAlert('¡Wuau!', 'Debes seleccionar el punto de encuentro en el mapa')
            } else {
              this.setState({isLoading: true})
              const attributesDicc = this.prepareAttributes()
              if (this.state.isEditingRoute) {
                //  await Fire.shared.updateAttributeDog(attributesDicc, this.state.newValueKeyDog)
              } else {
                await Fire.shared.createNewRouteWithAttributes(attributesDicc, this.props.dataNewRoute.photo)
              }
              this.setState({isLoading: false})
              this.goToBack()
              this.props.refreshList();
            }
          }
        }
      }
    }
  }

  prepareAttributes = () => {
    var attributes = {}
    attributes = this.props.dataNewRoute
    attributes.keyCreator = this.props.dataMyUser.key
    attributes.imageCreator = this.props.dataMyUser.image
    attributes.nameCreator = this.props.dataMyUser.name
    return attributes
  }

  goToBack() {
    this.props.nav.goBack(null)
  }

  _showSimpleAlert = (title, description) => {
    Alert.alert(title, description, [
      {
        text: 'Aceptar',
        onPress: () => console.log('OK Pressed')
      }
    ], {cancelable: false})
  }

  renderItem = () => (<Item keyCreator={this.props.dataMyUser.key} imageCreator={this.props.dataMyUser.image} nameCreator={this.props.dataMyUser.name} title={this.props.dataNewRoute.title} image={this.props.dataNewRoute.photo} description={this.props.dataNewRoute.description} date={this.props.dataNewRoute.date} time={this.props.dataNewRoute.time} isHiddenOption={true} coords={this.props.dataNewRoute.coords} duration={this.props.dataNewRoute.duration}/>)

  render() {
    if (this.props.currentPosition == 2) {
      return (<ScrollView style={styles.container}>
        <CopilotStep text="Vista previa de tu ruta. ¡Click en 'Crear ruta' si todo está genial!" order={1} name="createRoute">
          <WalkthroughableView style={{
              alignItems: 'center',
              paddingLeft: 35,
              paddingRight: 30,
              borderWidth: 3,
              marginLeft: 5,
              marginRight: 5,
              borderColor: Colors.verdeOscuro
            }}>
            {this.renderItem()}
          </WalkthroughableView>
        </CopilotStep>
        <AwesomeButtonRick type="secondary" style={{
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 50
          }} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.background} onPress={value => this.comprobeChanges()}>
          ¡Crear ruta!
        </AwesomeButtonRick>
        <Loader loading={this.state.isLoading}/>
      </ScrollView>)
    }
    return (<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  }
})

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute, dataMyUser: state.dataMyUser, refreshRoutes: state.refreshRoutes}
}

export default connect(mapStateToProps, actions)(copilot({tooltipComponent: TooltipCopilot, animated: true, overlay: 'svg'})(EndRoute))
