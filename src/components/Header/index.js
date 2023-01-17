import PropTypes from 'prop-types';
import './header.scss';

function Header({ baseAmount, onInputChange }) {
  return (
    <header className="header">
      <h1 className="header__title">Converter</h1>
      <input
        className="header__input"
        type="number"
        placeholder="Montant en euros"
        // avec la propriété value, je "branche" la donnée en provenance de mon état
        // sur l'input
        value={baseAmount}
        // avec la propriété onChange je réagis a une modification
        // pour mettre a jour l'état lorsque l'input change
        onChange={onInputChange}
      />
    </header>
  );
}

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Header;
