import React from "react";
import {Icon} from "expo";

import Colors from "../constants/Colors";

export default class TabBarIcon extends React.Component {
  render() {
    return (<Icon.Ionicons name={this.props.name} size={this.props.size
        ? this.props.size
        : 26} style={{
        marginBottom: -3
      }} color={this.props.focused
        ? Colors.tabIconSelected
        : Colors.pinkChicle
}/>);
  }
}
