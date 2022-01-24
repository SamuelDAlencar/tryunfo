import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      emptyPreview,
    } = this.props;
    return (
      <div className="card">
        { emptyPreview
          ? <h1>Sua carta</h1>
          : (
            <>
              <h1 data-testid="name-card" name="name">{cardName}</h1>
              <img
                data-testid="image-card"
                name="imagem"
                src={ cardImage }
                alt={ cardName }
              />
              <span
                data-testid="description-card"
                name="descrição"
              >
                {cardDescription}
              </span>
              <span data-testid="attr1-card" name="atribute1">{cardAttr1}</span>
              <span data-testid="attr2-card" name="atribute2">{cardAttr2}</span>
              <span data-testid="attr3-card" name="atribute3">{cardAttr3}</span>
              <span data-testid="rare-card" name="raridade">{cardRare}</span>
              { cardTrunfo && <span data-testid="trunfo-card">Super Trunfo</span>}
            </>
          )}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;
