/* eslint-disable no-console */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import Result from '../Result';
import Header from '../Header';
import Currencies from '../Currencies';
import Toggler from '../Toggler';

import currenciesList from '../../data/currencies';

import './app.scss';

// composant sous forme de classe
class App extends React.Component {
  // le constructeur recoit en parametre les propriétés (props)
  constructor(props) {
    // les props sont transmises au constructeur de la classe parente
    // c'est a dire le constructeur de React.Component
    super(props);

    // dans le constructeur, nous pouvons définir
    // un état interne a notre composant avec this.state
    // le state sera TOUJOURS un objet.
    // dedans on peut mettre tout ce que l'on veut !
    this.state = {
      // le nombre d'euros a convertir
      baseAmount: 5,
      // est-ce que la liste est ouverte ou pas...
      isListOpen: true,
      // la devise selectionnée
      selectedCurrency: 'Australian Dollar',
      // le champ de recherche
      searchedText: '',
    };

    // j'associe le contexte (this) a la fonction
    // j'obtiens une fonction au contexte associé explicitement
    // et je la "re range" au meme endroit
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
  }

  componentDidMount() {
    console.log('Le composant <App /> vient d\'être monté !');

    // ici, je pourrai faire des choses, au moment ou le composant est chargé
    // initialement
    document.title = `Conversion des euros vers ${this.state.selectedCurrency}`;
  }

  // avec prevProps et prevState, je peux accéder aux
  // props / state tels qu'ils étaient lors du précédent rendu
  // et les comparer aux actuelles (this.props et this.state)
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCurrency !== this.state.selectedCurrency) {
      console.log(
        'je modifie le titre en réaction a un nouveau rendu (causé par un changement detat)',
      );
      document.title = `Conversion de euros vers ${this.state.selectedCurrency}`;
    }
  }

  handleInputSearchChange(event) {
    this.setState({
      searchedText: event.target.value,
    });
  }

  handleButtonClick() {
    console.log('avant le set state');
    // pour changer mon état, je peux appeler la méthode setState
    // setState prendra en parametre un objet
    // dans lequel je pourrai changer tout ou partie de mon state.
    // setState changera la donnée, puis déclenchera un nouveau rendu
    // cad un appel a la méthode render.
    this.setState({
      // j'inverse la valeur actuelle.
      // et je la remet dans le state au meme endroit.
      isListOpen: !this.state.isListOpen,
    });
  }

  handleCurrencyClick(newCurrency) {
    console.log('je suis dans handleCurrencyClick');
    // probleme : comment savoir sur quelle devise j'ai cliqué ?

    this.setState({
      selectedCurrency: newCurrency,
    });
  }

  handleInputChange(event) {
    console.log('une modif de l input a eu lieu.');

    console.log('typeof event.target.value', event.target.value);

    // j'apelle setState pour changer mon état
    this.setState({
      // valueAsNumber : uniquement pour un input de type number,
      // permet de récupérer direct le nombre sans avoir a parseInt nous mêmes.
      baseAmount: event.target.valueAsNumber,
    });
  }

  // une fonction qui calculera la valeur convertie et la renverra
  makeConversion() {
    // faire la conversion, plan d'action

    // je sais que le montant a convertir est this.state.baseAmount
    // je sais aussi, que j'ai dans la variable currenciesList la liste des devises.
    // et enfin, je sais que la devise selectionnée est stockée dans this.state.selectedCurrency

    // premiere étape : trouver dans le tableau currenciesList la bonne devise
    // je cherche la devise dont le nom correspond a mon state this.state.selectedCurrency
    const foundCurrency = currenciesList.find(
      (c) => c.name === this.state.selectedCurrency,
    );

    // maintenant, je prend le taux de conversion de cette devise (foundCurrency.rate)
    // et je multiplie par le this.state.baseAmount
    const convertedAmount = foundCurrency.rate * this.state.baseAmount;

    // je garde que 2 décimales apres la virgule
    const convertedAmountFixed = parseFloat(convertedAmount.toFixed(2));

    // et je renvoie le tout.
    return convertedAmountFixed;
  }

  render() {
    return (
      <div className="app">
        <Header
          // la valeur de l'input dans notre état actuel
          baseAmount={this.state.baseAmount}
          // que faire lorsque l'input est modifié par l'utilisateur ?
          onInputChange={this.handleInputChange}
        />
        <Toggler
          isOpen={this.state.isListOpen}
          onButtonClick={this.handleButtonClick}
        />
        {/* pour piocher quelque chose dans mon état, je peux faire this.state.truc */}
        <Currencies
          // controllera la transition
          // si isListOpen, j'affiche la liste avec transition
          isOpen={this.state.isListOpen}
          currencies={currenciesList}
          onCurrencyClick={this.handleCurrencyClick}
          searchedText={this.state.searchedText}
          onSearchChange={this.handleInputSearchChange}
        />
        <Result
          value={this.makeConversion()}
          selectedCurrency={this.state.selectedCurrency}
        />
      </div>
    );
  }
}

// == Export
export default App;
