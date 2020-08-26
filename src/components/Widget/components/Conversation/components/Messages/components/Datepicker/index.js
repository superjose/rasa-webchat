import React, { useRef, useState, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';
import ThemeContext from '../../../../../../ThemeContext';

import './styles.scss';

const Datepicker = props => {
    const {elements} = props.message.toJS();
    const [date, setDate] = useState();
    const {entity, title, payload} = elements;
    const { chooseReply } = props;
    console.log('Props is', props);
    console.log('Date Picker in JS', elements);
    // const { mainColor, assistTextColor } = useContext(ThemeContext);
    // const { linkTarget } = props;

    const onChange = e => {
        const val = e.target.value;
        setDate(val);
    };

    const onSubmit = () => {
        if (!date) {
            return;
        }
        const formPayload = payload+`{"${entity}":"${date}"}`
        chooseReply(formPayload, date);
    };
    return (
        <>
            <label>
                {title}
                <input type="date" onChange={onChange} />
            </label>
            <button type="button" disabled={!date} onClick={onSubmit}>
                Enviar
            </button>
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
