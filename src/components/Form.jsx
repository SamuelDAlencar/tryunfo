import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onSaveButtonClick,
      onInputChange,
    } = this.props;

    return (
      <form>
        <label htmlFor="name">
          Nome
          <input
            name="cardName"
            id="name"
            type="text"
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="descrição">
          Descrição
          <textarea
            name="cardDescription"
            id="descrição"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="atribute1">
          Atrr 1
          <input
            name="cardAttr1"
            id="atribute1"
            type="number"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="atribute2">
          Atrr 2
          <input
            name="cardAttr2"
            id="atribute2"
            type="number"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="atribute3">
          Atrr 3
          <input
            name="cardAttr3"
            id="atribute3"
            type="number"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="imagem">
          Imagem
          <input
            name="cardImage"
            id="image"
            type="text"
            data-testid="image-input"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="raridade">
          Raridade
          <select
            name="cardRare"
            id="raridade"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        {
          !hasTrunfo
            ? <label htmlFor="trunfo">
              Trunfo
              <input
                name="cardTrunfo"
                id="trunfo"
                type="checkbox"
                data-testid="trunfo-input"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            </label>
            : <p>Você já tem um Super Trunfo em seu baralho</p>
        }
        <button
          name="isSaveButtonDisabled"
          type="button"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;
