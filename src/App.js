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
    };
  }

  onInputChange({ target: { name, type, checked, value } }) {
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
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
    }));

    if (cardTrunfo && !hasTrunfo) {
      this.setState({ hasTrunfo: true });
    }
  }

  cardRemover = (e) => {
    const { cards } = this.state;
    const { id } = e.parentNode;

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
  }

  render() {
    const {
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
    } = this.state;
    return (
      <div>
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
            <h1>Card preview</h1>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </section>
        </section>
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
