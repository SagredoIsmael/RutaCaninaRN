import React from 'react';
import { Avatar } from 'react-native-elements';
import ImagePickers from '../components/ImagePicker'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class PerfilScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Avatar
            xlarge
            rounded
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
            onPress={() => this.pressButton() }
            activeOpacity={0.7}
            containerStyle={{flex: 2, marginLeft: 20, marginTop: 20}}
          />
        </View>
      </ScrollView>
    );
  }

  pressButton(){
    new ImagePickers()._pickImage()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#69a5b0',
  },
  photoUser: {
    marginTop: 60,
    marginBottom: 20,
  },
});
