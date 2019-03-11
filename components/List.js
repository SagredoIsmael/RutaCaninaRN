import React from "react"
import {FlatList, View} from "react-native"
import Colors from "../constants/Colors"
import Footer from "./Footer"
import Item from "./Item"

class List extends React.Component {
  renderItem = ({item}) => <Item {...item} nav={this.props.nav} keyRoute={item.key} myKey={this.props.myKey}/>;
  keyExtractor = item => item.key;
  render() {
    const {
      onPressFooter,
      ...props
    } = this.props;
    return (<FlatList style={{
        paddingTop: 10
      }} keyExtractor={this.keyExtractor} ListFooterComponent={footerProps => (<Footer {...footerProps} onPress={onPressFooter}/>)} renderItem={this.renderItem} {...props} ItemSeparatorComponent={this.renderSeparator}/>)
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
export default List;
