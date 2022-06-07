import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RemoverButton extends Component {
  render() {
    const {
      cardRemover,
    } = this.props;
    return (
      <button
        type="button"
        onClick={ cardRemover }
        data-testid="delete-button"
        className="remove-button"
      >
        Remover
      </button>
    );
  }
}

RemoverButton.propTypes = {
  cardRemover: PropTypes.func,
}.isRequired;
