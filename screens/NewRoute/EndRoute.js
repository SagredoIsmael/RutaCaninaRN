import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Colors from '../../constants/Colors'
import {copilot, walkthroughable, CopilotStep} from '@okgrow/react-native-copilot'
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
    secondStepActive: true
  }

  componentDidMount() {
    this.props.copilotEvents.on('stepChange', this.handleStepChange);
    this.props.start();
  }

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  render() {
    if (this.props.currentPosition == 3) {
      return (<View style={styles.container}></View>);
    }
    return (<View/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {dataNewRoute: state.dataNewRoute}
}

export default connect(mapStateToProps, actions)(copilot({animated: true, overlay: 'svg'})(EndRoute))
