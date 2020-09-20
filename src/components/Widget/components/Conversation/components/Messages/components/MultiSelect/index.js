// @ts-check
import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';

const MultiSelect = props => {
    const { chooseReply } = props;
    const { elements } = props.message.toJS();
    // Where value is an array of shape: [{id: string, name: string}]
    const { title, value, payload, entity } = elements;
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);

    // Splits the list into different groups:
    const pages = useMemo(() => {
        const _pages = [];
        if (!value) {
            return _pages;
        }
        // We get 4 elements per page.
        // This number (4) could be a prop.
        const totalPages = Math.ceil(value.length / 4);

        for (let i = 0; i < totalPages; i++) {
            const _page = value.slice(i * 4, (i + 1) * 4);
            _pages.push(_page);
        }
        return _pages;
    }, [value]);

    const onChange = e => {
        const val = e.target.value;
        const valueIndex = selected.indexOf(val);
        if (valueIndex === -1) {
            setSelected(selected.concat(val));
            return;
        }
        const removed = selected.splice(valueIndex, -1);
        setSelected(removed);
    };

    const continueOrSubmit = () => {
        if (page !== pages.length - 1) {
            setPage(page + 1);
            return;
        }
        const idsToSend = [];
        const valuesToDisplay = [];
        selected.forEach(val => {
            const castedVal = parseInt(val);
            idsToSend.push(castedVal.toString());
            valuesToDisplay.push(value.find(v => v.id === castedVal).name);
        });

        const formPayload = `${payload}{"${entity}": "${idsToSend.join(',')}"}`;
        chooseReply(formPayload, valuesToDisplay.join(','));
    };

    return (
        <>
            {title}
            <br />
            {pages[page].map(p => (
                <React.Fragment key={p.id}>
                <label>
                    {p.name} <input type="checkbox" value={p.id} onChange={onChange} />
                </label>
                <br/>
                </React.Fragment>
            ))}
            <br/>
            <button type="button" onClick={continueOrSubmit}>
                Continuar
            </button>
        </>
    );
};

MultiSelect.propTypes = {
    message: PROP_TYPES.MULTI_SELECT,
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelect);
