// SwipeCards.js
"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import SwipeCards from "../helpers/react-native-swipe-cards/SwipeCards";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[styles.card, { backgroundColor: this.props.backgroundColor }]}
      >
        <Text>{this.props.question}</Text>
      </View>
    );
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
    };
  }

  handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }
  handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={this.props.renderCard}
        renderNoMoreCards={this.props.renderNoMoreCards}
        handleYup={this.props.handleYup}
        handleNope={this.props.handleNope}
        hasMaybeAction={false}
        neutral={this.props.neutral}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
});
