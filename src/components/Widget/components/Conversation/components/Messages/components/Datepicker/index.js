import React, { useRef, useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';
import ThemeContext from '../../../../../../ThemeContext';

import './styles.scss';

const Datepicker = props => {
    const datepicker = props.message.toJS();
    console.log('Props is', props);
    console.log('Date Picker in JS', datepicker);
    // const { mainColor, assistTextColor } = useContext(ThemeContext);
    // const { linkTarget } = props;

    const onChange = e => {
        const title = e.target.value;
        console.log('Title is', title);
        const { chooseReply } = props;
        console.log(chooseReply);
        chooseReply(datepicker.elements.payload, title);
    };

    return (
        <>
            <label>
                {datepicker.elements.title}
                <input type="date" onChange={onChange} />
            </label>
        </>
    );
};

Datepicker.propTypes = {
    message: PROP_TYPES.DATEPICKER,
    // completely bugged, it's actually used in handle click
    // eslint-disable-next-line react/no-unused-prop-types
    chooseReply: PropTypes.func.isRequired,
    linkTarget: PropTypes.string,
};

const mapStateToProps = state => ({
    linkTarget: state.metadata.get('linkTarget'),
});

const mapDispatchToProps = dispatch => ({
    chooseReply: (payload, title) => {
        console.log('Reached Dispatch To Props', payload, title);
        dispatch(addUserMessage(title));
        dispatch(emitUserMessage(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Datepicker);
