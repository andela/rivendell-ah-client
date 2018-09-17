import React from 'react';
import { PropTypes } from 'prop-types';
import { Statistic } from 'semantic-ui-react';

export const RatingStats = (props) => {
  const { myRatingPopup, average, ratersPopup } = props;
  return (
    <Statistic.Group size="mini" widths="9">
      <Statistic color="yellow">
        <Statistic.Value>{myRatingPopup}</Statistic.Value>
        <Statistic.Label>My Rating</Statistic.Label>
      </Statistic>

      <Statistic color="orange">
        <Statistic.Value>{average}</Statistic.Value>
        <Statistic.Label>Average</Statistic.Label>
      </Statistic>


      <Statistic color="purple">
        <Statistic.Value>{ratersPopup}</Statistic.Value>
        <Statistic.Label>Raters</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

RatingStats.propTypes = {
  myRatingPopup: PropTypes.shape({}).isRequired,
  average: PropTypes.number.isRequired,
  ratersPopup: PropTypes.shape({}).isRequired,
};

export default RatingStats;
