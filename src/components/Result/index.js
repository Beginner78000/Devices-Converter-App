import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import './result.scss';

function Result({ value, selectedCurrency }) {
  return (
    <div className="result">
      <CountUp
        className="result__amount"
        end={value}
        duration={0.5}
        decimals={2}
      />
      <p className="result__currency">{selectedCurrency}</p>
    </div>
  );
}

Result.propTypes = {
  value: PropTypes.number.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};

export default Result;
