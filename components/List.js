import React from "react"
import {FlatList, View, Button} from "react-native"
import Colors from "../constants/Colors"
import {connect} from "react-redux"
import {resetScrollPositionList} from '../actions/routesActions'
import Item from "./Item"
import {NavigationEvents} from "react-navigation"

class List extends React.Component {
  renderItem = ({item}) =>
  <View>
    <Item {...item} nav={this.props.nav} keyRoute={item.key} myKey={this.props.myKey} route={item}/>
  </View>;
  keyExtractor = item => item.key;
  render() {
    const {
      ...props
    } = this.props;
    return (
      <View>
        <NavigationEvents onDidFocus={(payload) => this._comprobeScrollPosition()}/>
        <FlatList style={{
            paddingTop: 10
          }} ref={(ref) => {
            this.flatListRef = ref;
          }} keyExtractor={this.keyExtractor} renderItem={this.renderItem} {...props} ItemSeparatorComponent={this.renderSeparator}/>
      </View>
    )
  }

  _comprobeScrollPosition = () => {
    if (this.props.scrollPositionList.keyRoute != null) {

      if (this.props.scrollPositionList.keyRoute != '' && this.props.dataRoutes.items != null) {
        for (var i = 0; i < this.props.dataRoutes.items.length; i++) {
          if (this.props.dataRoutes.items[i].key == this.props.scrollPositionList.keyRoute) {
            this.flatListRef.scrollToIndex({animated: true, index: i})
            this.props.resetScrollPositionList()
            break
          }
        }
      }
    }
  }

  renderSeparator = () => {
    return (<View style={{
        height: 1.5,
        backgroundColor: Colors.verdeOscuro,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "14%",
        marginRight: "14%"
      }}/>)
  }
}

const mapStateToProps = state => {
  return {scrollPositionList: state.scrollPositionList, dataRoutes: state.dataRoutes};
}

const mapDispatchToProps = dispatch => {
  return {
    resetScrollPositionList: () => {
      dispatch(resetScrollPositionList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
