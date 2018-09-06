import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

export default class RutasScreen extends React.Component {
  static navigationOptions = {
    title: 'Rutas cerca de mí',
  };

  constructor(){
    super()
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      itemDataSource: ds
    }
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  componentWillMount(){
    this.getItems();
  }

  componentDidMount(){
    this.getItems();
  }

  getItems(){
    let items = [{title:'Item uno'}, {title:'Item dos coño'}];

    this.setState({
        itemDataSource : this.state.itemDataSource.cloneWithRows(items)
    })
  }

  renderRow(item){
    return (
      <TouchableHighlight onPress = {() => {
        this.pressRow(item)
      }}>
        <View style={styles.container}>
          <Text> El titulo de lo que has seleccionado es: {item.title} </Text>
        </View>
      </TouchableHighlight>
    );
  }

  pressRow(){
    console.log(item)
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource = {this.state.itemDataSource}
          renderRow = {this.renderRow}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69a5b0',
  },
});
