import PropTypes from 'prop-types';
import './currencies.scss';

function Currencies({
  isOpen,
  searchedText,
  currencies,
  onCurrencyClick,
  onSearchChange,
}) {
  return (
    <div className={isOpen ? 'currencies' : 'currencies currencies--closed'}>
      <h2 className="currencies__title">Currencies</h2>
      <input
        className="currencies__input"
        type="text"
        placeholder="Chercher une devise"
        value={searchedText}
        onChange={onSearchChange}
      />
      <ul className="currencies__list">
        {currencies
          // je ne garde que les devises dont le nom contient la recherche
          .filter((c) => c.name.toLowerCase().includes(searchedText.toLowerCase()))
          // et je map sur la résultante du filter
          .map((currency) => (
            <li
              key={currency.name}
              className="currencies__list__item"
              onClick={() => onCurrencyClick(currency.name)}
            >
              {currency.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

Currencies.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchedText: PropTypes.string.isRequired,
};

export default Currencies;
