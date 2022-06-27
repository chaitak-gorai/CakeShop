import React from 'react';
import PropTypes from 'prop-types';
const Rating = ({ value, text, color }) => {
  var ratings = [];
  for (var i = 0; i < 5; i++) {
    ratings.push(
      <span key={i}>
        <i
          style={{ color }}
          className={
            value >= i
              ? 'fas fa-star'
              : value >= i - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    );
  }
  return <div className='rating'>{ratings}</div>;
};
Rating.defaultProps = {
  color: '#f8e825',
};
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
