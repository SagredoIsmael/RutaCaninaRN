import React from 'react';
import { StyleSheet, Image } from 'react-native';

class CustomMarker1 extends React.Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={
          this.props.pressed ? require('../assets/images/loader/dog.png') : require('../assets/images/loader/paws.png')
        }
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
});

export default CustomMarker1;
