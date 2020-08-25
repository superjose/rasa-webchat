import React, { useRef, useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';
import ThemeContext from '../../../../../../ThemeContext';

import './styles.scss';

const Datepicker = (props) => {
  const datepicker = props.message.toJS();
  // const { mainColor, assistTextColor } = useContext(ThemeContext);
  // const { linkTarget } = props;
  return (
    <>
    <label>
      {datepicker.title}
      <input type="date" value={datepicker.value} />
    </label>
    </>
  );
};


Datepicker.propTypes = {
  message: PROP_TYPES.DATEPICKER,
  // completely bugged, it's actually used in handle click
  // eslint-disable-next-line react/no-unused-prop-types
  chooseReply: PropTypes.func.isRequired,
  linkTarget: PropTypes.string
};

const mapStateToProps = state => ({
  linkTarget: state.metadata.get('linkTarget')
});

const mapDispatchToProps = dispatch => ({
  chooseReply: (payload, title) => {
    if (title) dispatch(addUserMessage(title));
    dispatch(emitUserMessage(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Datepicker);
