import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Image
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";

const icons = [
  require("../assets/images/loader/dog.png"),
  require("../assets/images/loader/bone.png"),
  require("../assets/images/loader/paws.png"),
  require("../assets/images/loader/toys.png")
];
const Loader = ({loading = false, color, size, opacity = 0.4}) => {
  return (
    <Modal
      transparent
      animationType={"none"}
      visible={loading}
      onRequestClose={() => null}
    >
      <View
        style={[
          styles.modalBackground,
          {backgroundColor: `rgba(0,0,0,${opacity})`}
        ]}
      >
        <View style={styles.activityIndicatorWrapper}>
          <Text style={styles.text}> Cargando.. </Text>
          <Image
            style={styles.image}
            source={icons[Math.floor(Math.random() * 3) + 1]}
            resizeMode="contain"
          />
          <ActivityIndicator
            animating={loading}
            color={Colors.verdeOscuro}
            size={"large"}
          />
        </View>
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  opacity: (props, propName, componentName) => {
    if (props[propName] < 0 || props[propName] > 1) {
      return new Error("Opacity prop value out of range");
    }
  }
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  activityIndicatorWrapper: {
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
    width: 40,
    paddingVertical: 20
  },
  text: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 16
  }
});

export default Loader;
