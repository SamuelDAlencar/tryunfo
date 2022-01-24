import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import RemoverButton from './components/RemoverButton';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.cardRemover = this.cardRemover.bind(this);
    this.state = {
      cards: [],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      noCards: true,
      emptyPreview: true,
    };
  }

  onInputChange({ target: { name, type, checked, value } }) {
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
      emptyPreview: false,
    }, () => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
      } = this.state;
      const maxAttr = 210;
      const minAttr = 90;

      if (cardName !== ''
        && cardDescription !== ''
        && cardImage !== ''
        && cardRare !== ''
        && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= maxAttr
        && Number(cardAttr1) <= minAttr
        && Number(cardAttr2) <= minAttr
        && Number(cardAttr3) <= minAttr
        && Number(cardAttr1) >= 0
        && Number(cardAttr2) >= 0
        && Number(cardAttr3) >= 0) {
        this.setState({ isSaveButtonDisabled: false });
      } else {
        this.setState({ isSaveButtonDisabled: true });
      }
    });
  }

  onSaveButtonClick() {
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
    } = this.state;

    const newCard = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState(({ cards }) => ({
      cards: [...cards, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      isSaveButtonDisabled: true,
      cardTrunfo: false,
      noCards: false,
      emptyPreview: true,
    }));

    if (cardTrunfo && !hasTrunfo) {
      this.setState({ hasTrunfo: true });
    }
  }

  cardRemover = ({ parentNode }) => {
    const { cards } = this.state;
    const { id } = parentNode;

    if (cards[id].cardTrunfo) {
      this.setState({
        hasTrunfo: false,
      }, () => {
        this.setState({ cards: cards.slice(id + 1) });
      });
    } else {
      this.setState({ cards: cards.slice(id + 1) });
    }
    console.log(cards[id].cardTrunfo);
    console.log(id);

    // Still incomplete
  }

  render() {
    const {
      noCards,
      cards,
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
      emptyPreview,
    } = this.state;
    return (
      <div className="main">
        <h1>Tryunfo</h1>
        <section className="form-cards">
          <Form
            onInputChange={ this.onInputChange }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            onSaveButtonClick={ this.onSaveButtonClick }
            isSaveButtonDisabled={ isSaveButtonDisabled }
          />
          <section className="cardPreview">
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              emptyPreview={ emptyPreview }
            />
          </section>
        </section>
        { noCards ? <h1>Seu baralho está vazio</h1> : <h1>Seu baralho</h1> }
        <section className="savedCards">
          {cards.map((card, i) => (
            <div key={ i } id={ i } className="savedCard">
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <RemoverButton
                cardRemover={ ((e) => this.cardRemover(e.target)) }
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
