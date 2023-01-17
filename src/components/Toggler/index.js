import PropTypes from 'prop-types';
import './toggler.scss';

function Toggler({ isOpen, onButtonClick }) {
  return (
    <button
      type="button"
      // si isOpen je veux la classe toggler--open et la classe toggler
      // sinon... blabla
      className={isOpen ? 'toggler toggler--open' : 'toggler'}
      // quand tu clique sur le bouton
      // tu appelle la propriété onButtonClick
      onClick={onButtonClick}
    >
      =
    </button>
  );
}

Toggler.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // une prop de type fonction.
  onButtonClick: PropTypes.func.isRequired,
};

export default Toggler;
