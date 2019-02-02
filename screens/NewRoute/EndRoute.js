import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import {copilot, walkthroughable, CopilotStep} from '@okgrow/react-native-copilot'
import TooltipCopilot from '../../components/TooltipComponent/TooltipCopilot'
import Fire from "../../api/Fire"
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Item from "../../components/Item"
import {
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
    isHelper: true,
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange)
    this.props.onRef(this)
    this.userRequest()
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  componentDidUpdate() {
    if (this.state.isHelper)
      this.activateHelper()
  }

  activateHelper = () => {
    this.props.start()
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  userRequest = async () => {
    const {dataUser} = await Fire.shared.getInfoUser(this.props.keyUser)
    this.props.insert_dataMyUser(dataUser)
  }


  renderItem = () => <Item keyCreator={this.props.keyUser}
                          imageCreator={this.props.dataMyUser.image} nameCreator={this.props.dataMyUser.name} title={this.props.dataNewRoute.name} image={this.props.dataNewRoute.photo} description={this.props.dataNewRoute.description} date={this.props.dataNewRoute.date} time={this.props.dataNewRoute.time} coords={this.props.dataNewRoute.coords} duration={this.props.dataNewRoute.duration[0]}/>

  render() {
    if (this.props.currentPosition == 3) {
      if (this.state.isHelper)
        this.setState({isHelper: false})
      return (
        <ScrollView style={styles.container}>
          <CopilotStep text="Vista previa de tu ruta. ¡Click en 'Crear ruta' si todo está genial!" order={1} name="createRoute">
            <WalkthroughableView style={{
                alignItems: 'center',
                paddingLeft: 35,
                paddingRight: 30,
                borderWidth: 3,
                marginLeft: 5,
                marginRight: 5,
                borderColor: Colors.verdeOscuro,
              }}>
              {this.renderItem()}
            </WalkthroughableView>
          </CopilotStep>
          <AwesomeButtonRick type="secondary" style={{
              alignSelf: 'center',
              marginTop: 30,
            }} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.verdeOscuro} onPress={value => console.log('guardar')}>
            ¡Crear ruta!
          </AwesomeButtonRick>
        </ScrollView>
        )
    }
    return (<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute,
          dataMyUser: state.dataMyUser,
          keyUser: state.keyUser}
}

export default connect(mapStateToProps, actions)(copilot({tooltipComponent: TooltipCopilot, animated: true, overlay: 'svg'})(EndRoute))
