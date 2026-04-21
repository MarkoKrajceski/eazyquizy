import SwipeCardsLib from "../helpers/react-native-swipe-cards/SwipeCards";

export default function SwipeCards(props) {
  return (
    <SwipeCardsLib
      cards={props.cards}
      renderCard={props.renderCard}
      renderNoMoreCards={props.renderNoMoreCards}
      handleYup={props.handleYup}
      handleNope={props.handleNope}
      hasMaybeAction={false}
      neutral={props.neutral}
    />
  );
}
