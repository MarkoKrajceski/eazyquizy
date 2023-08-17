"use strict";

import React, { Component } from "react";
import { Text, View } from "react-native";
import { defaultsStyles } from "./Styles";
import Ionicons from "@expo/vector-icons/Ionicons";

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={defaultsStyles.noMoreCardsText}>No more cards</Text>
      </View>
    );
  }
}

class ActionView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.text == "Yup!" ? (
          this.props.neutral ? (
            <Ionicons name="arrow-forward-circle" size={24} color="gray" />
          ) : (
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          )
        ) : this.props.neutral ? (
          <Ionicons name="arrow-back-circle" size={24} color="gray" />
        ) : (
          <Ionicons name="md-close-circle" size={32} color="red" />
        )}
      </View>
    );
  }
}

export default {
  NoMoreCards,
  ActionView,
};
