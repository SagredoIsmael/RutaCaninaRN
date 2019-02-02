import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import {copilot, walkthroughable, CopilotStep} from '@okgrow/react-native-copilot'
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

const WalkthroughableText = walkthroughable(Text)
const WalkthroughableImage = walkthroughable(Image)

export class EndRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    secondStepActive: true,
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange)
    this.props.start()
    this.userRequest()
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  userRequest = async () => {
    const {dataUser} = await Fire.shared.getInfoUser(this.props.keyUser)
    this.props.insert_dataMyUser(dataUser)
  }

  //TODO:1) prepare perfectly object to NewRoute (sames keys to firebase) and 2) comprobes right dates and stepbystep with Error?

  renderItem = () => <Item imageCreator={this.props.dataMyUser.image} nameCreator={this.props.dataMyUser.name} title={this.props.dataNewRoute.name} image={this.props.dataNewRoute.photo}/>

  render() {
    if (this.props.currentPosition == 3) {
      return (
        <ScrollView style={styles.container}>
          <View style={{
              alignItems: 'center',
              paddingLeft: 35,
              paddingRight: 30
            }}>
            {this.renderItem()}
            <AwesomeButtonRick type="secondary" style={{
                alignSelf: 'center',
                marginTop: 30,
              }} borderColor={Colors.pinkChicle} raiseLevel={2} textColor={Colors.pinkChicle} backgroundDarker={Colors.pinkChicle} backgroundShadow={Colors.pinkChicle} backgroundActive={Colors.verdeOscuro} onPress={value => console.log('guardar')}>
              ¡Crear ruta!
            </AwesomeButtonRick>
          </View>
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

export default connect(mapStateToProps, actions)(copilot({animated: true, overlay: 'svg'})(EndRoute))
