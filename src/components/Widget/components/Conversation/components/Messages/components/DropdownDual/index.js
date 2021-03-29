// @ts-check
import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';

import './styles.scss';
import { Dropdown } from './components';
import { RenderedMessage } from '../RenderedMessage';
import { RenderedButton } from '../RenderedButton';

const defaultDropdown = title => [
    {
        label: `Seleccione ${title}`,
        value: '',
    },
];

const DropdownDual = props => {
    const dropdowndual = props.message.toJS();
    const { elements } = dropdowndual;
    const {
        title,
        payload,
        value: { first, second },
    } = elements;

    const [firstDropdownValue, setFirstDropdownValue] = useState();
    const [secondDropdownValue, setSecondDropdownValue] = useState();
    const { chooseReply } = props;

    // Sets the first dropdown value (The id)
    const setFirstDropdown = e => {
        setFirstDropdownValue(e.target.value);
    };

    // Sets the second dropdown value (The id)
    const setSecondDropdown = e => {
        setSecondDropdownValue(e.target.value);
    };

    const firstDropdownOptions = useMemo(
        () =>
            defaultDropdown(first.title).concat(
                first.values.map(f => ({
                    label: f.title,
                    value: f.value,
                }))
            ),
        [first]
    );

    const secondDropdownOptions = useMemo(() => {
        if (!firstDropdownValue) {
            return defaultDropdown(second.title);
        }
        // Note the weak comparison. This is done because we can support both strings and ints.
        // They will all be passed as strings, and we need to do 1 == "1"
        const selectedObject = first.values.find(x => x.value == firstDropdownValue);
        return defaultDropdown(second.title).concat(
            second.values[selectedObject?.title]?.map(x => ({
                label: x.title,
                value: x.value,
            }))
        );
    }, [firstDropdownValue, second, first]);

    const submit = () => {
        if (!firstDropdownValue || !secondDropdownValue) {
            return;
        }
        // Note the weak comparison. This is done because we can support both strings and ints.
        // They will all be passed as strings, and we need to do 1 == "1"
        const firstDropdownObject = first.values.find(x => x.value == firstDropdownValue);
        const secondDropdownObject = second.values[firstDropdownObject.title].find(
            x => x.value == secondDropdownValue
        );

        const firstEntity = first.entity;
        const secondEntity = second.entity;
        const formedPayload =
            payload +
            `{"${firstEntity}": "${firstDropdownValue}", "${secondEntity}": "${secondDropdownValue}"}`;

        chooseReply(formedPayload, `${firstDropdownObject?.title} ${secondDropdownObject?.title}`);
    };

    return (
        <div>
            <RenderedMessage>{title}</RenderedMessage>
            <div>
                <Dropdown
                    label={first.title}
                    options={firstDropdownOptions}
                    onChange={setFirstDropdown}
                />
                <Dropdown
                    label={second.title}
                    options={secondDropdownOptions}
                    onChange={setSecondDropdown}
                />
            </div>
            <RenderedButton
                type="button"
                onClick={submit}
                disabled={!firstDropdownValue || !secondDropdownValue}
            >
                Enviar
            </RenderedButton>
        </div>
    );
};

DropdownDual.propTypes = {
    message: PROP_TYPES.DROPDOWN_DUAL,
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

export default connect(mapStateToProps, mapDispatchToProps)(DropdownDual);
