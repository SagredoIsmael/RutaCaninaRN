import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import PropTypes from 'prop-types'
import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'

const WalkthroughableText = walkthroughable(Text)
const WalkthroughableImage = walkthroughable(Image)

export class EndRoute extends React.Component {
  static navigationOptions = {
    header: null
  }

  static propTypes = {
    start: PropTypes.func.isRequired,
    copilotEvents: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    secondStepActive: true,
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange);
    this.props.start();
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  render() {
    if (this.props.currentPosition == 3){
      return (
      <View style={styles.container}>
        <CopilotStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
          <WalkthroughableText style={styles.title}>
            {'Welcome to the demo of\n"React Native Copilot"'}
          </WalkthroughableText>
        </CopilotStep>
        <View style={styles.middleView}>
          <CopilotStep active={this.state.secondStepActive} text="Here goes your profile picture!" order={2} name="secondText">
            <WalkthroughableImage
              source={{ uri: 'https://pbs.twimg.com/profile_images/527584017189982208/l3wwN-l-_400x400.jpeg' }}
              style={styles.profilePhoto}
            />
          </CopilotStep>
          <TouchableOpacity style={styles.button} onPress={() => this.props.start()}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    }
    return (
      <View/>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});


const mapStateToProps = state => {
  return {
    dataNewRoute : state.dataNewRoute,
  }
}

export default connect(mapStateToProps, actions)(copilot({
  animated: true,
  overlay: 'svg',
})(EndRoute))
