import React from "react"
import {FlatList, View, Button} from "react-native"
import Colors from "../constants/Colors"
import Footer from "./Footer"
import {connect} from "react-redux"
import * as actions from "../actions"
import Item from "./Item"
import {NavigationEvents} from "react-navigation"

class List extends React.Component {
  renderItem = ({item}) => <View>
    <Item {...item} nav={this.props.nav} keyRoute={item.key} myKey={this.props.myKey}/>
  </View>;
  keyExtractor = item => item.key;
  render() {
    const {
      onPressFooter,
      ...props
    } = this.props;
    return (<View>
      <NavigationEvents onDidFocus={(payload) => this._comprobeScrollPosition()}/>
      <FlatList style={{
          paddingTop: 10
        }} ref={(ref) => {
          this.flatListRef = ref;
        }} keyExtractor={this.keyExtractor} ListFooterComponent={footerProps => (<Footer {...footerProps} onPress={onPressFooter}/>)} renderItem={this.renderItem} {...props} ItemSeparatorComponent={this.renderSeparator}/>
    </View>)
  }

  _comprobeScrollPosition = () => {
    if (this.props.scrollPositionList.keyRoute != null) {
      console.log('hola');
      console.log(this.props.scrollPositionList.keyRoute);
      console.log(this.props.dataRoutes);
      if (this.props.scrollPositionList.keyRoute != '' && this.props.dataRoutes != null) {
        console.log('keyroute es:', this.props.scrollPositionList.keyRoute);
        console.log('dataroutes son', this.props.dataRoutes);
        for (var i = 0; i < this.props.dataRoutes.length; i++) {
          if (this.props.dataRoutes[i].key == this.props.scrollPositionList.keyRoute) {
            this.flatListRef.scrollToIndex({animated: true, index: i})
            this.props.insert_scrollPositionList({keyRoute: ''})
            break
          }
        }
      }
    }
  }

  renderSeparator = () => {
    return (<View style={{
        height: 1.5,
        backgroundColor: Colors.pinkChicle,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "14%",
        marginRight: "14%"
      }}/>)
  }
}

const mapStateToProps = state => {
  return {scrollPositionList: state.scrollPositionList, dataRoutes: state.dataRoutes};
};

export default connect(mapStateToProps, actions)(List);
