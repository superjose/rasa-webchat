// @ts-check
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';
import esLocale from 'date-fns/locale/es';

import './styles.scss';
/**
 * We tried using this. But the chatbot was showing it on top.
 * We do not know the sorcery, but setting the z-index wasn't working
 *
 * Therefore, as we have little time, we continued working.
 */
// import { MaterialPicker } from './components/MaterialPicker';
import { format } from 'date-fns';
import { RenderedButton } from '../RenderedButton';

const Datepicker = props => {
    const { elements } = props.message.toJS();
    const [date, setDate] = useState();
    const { entity, title, payload, disableFuture } = elements;
    const { chooseReply } = props;

    const onChange = e => {
        const val = e.target.value;
        setDate(val);
    };

    const onSubmit = () => {
        if (!date) {
            return;
        }
        const formPayload = payload + `{"${entity}":"${date}"}`;
        chooseReply(formPayload, date);
    };
    const maxDate = format(new Date(), 'yyyy-mm-dd', { locale: esLocale });
    return (
        <>
            <label>
                {title}
                {/* <MaterialPicker
                    handleDateChange={onChange}
                    date={date}
                    disableFuture={disableFuture}
                /> */}

                <input type="date" onChange={onChange} max={maxDate} />
            </label>
            <RenderedButton disabled={!date} onClick={onSubmit}>
                Enviar
            </RenderedButton>
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
        dispatch(addUserMessage(title));
        dispatch(emitUserMessage(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Datepicker);
