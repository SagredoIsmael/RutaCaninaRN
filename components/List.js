import React from 'react';
import { FlatList, View } from 'react-native';

import Footer from './Footer';
import Item from './Item';

class List extends React.Component {
  renderItem = ({ item }) => <Item {...item} />;
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList style={{ paddingTop: 10 }}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1.5,
          backgroundColor: 'rgba(232, 147, 142, 1)',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: "14%",
          marginRight: "14%",
        }}
      />
    );
  };

}
export default List;
