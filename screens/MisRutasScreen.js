import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class MisRutasScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return <ExpoConfigView />;
  }
}
