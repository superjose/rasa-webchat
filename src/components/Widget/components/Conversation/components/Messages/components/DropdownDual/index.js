// @ts-check
import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';
import ThemeContext from '../../../../../../ThemeContext';

import './styles.scss';
import { Dropdown } from './components';

const DropdownDual = props => {
    const dropdowndual = props.message.toJS();
    const { elements } = dropdowndual;
    const {
        title,
        payload,
        value: { first, second },
    } = elements;

    console.log('Props is', props);
    console.log('DropdownDual in JS', dropdowndual);
    // const { mainColor, assistTextColor } = useContext(ThemeContext);
    // const { linkTarget } = props;
    const [firstDropdownValue, setFirstDropdownValue] = useState('');
    const [secondDropdownValue, setSecondDropdownValue] = useState('');
    const { chooseReply } = props;

    const setFirstDropdown = e => {
        console.log('Setting first dropdown', e);
        console.log('Setting first dropdown value', e.target.value);
        setFirstDropdownValue(e.target.value);
    };

    const setSecondDropdown = e => {
        console.log(e);
        setSecondDropdownValue(e.target.value);
    };

    const firstDropdownOptions = useMemo(
        () =>
            [
                {
                    label: `Seleccione ${first.title}`,
                    value: '',
                },
            ].concat(
                first.values.map(f => ({
                    label: f,
                    value: f,
                }))
            ),
        [first]
    );

    const secondDropdownOptions = useMemo(() => {
        const defaultDropdown = [
            {
                label: `Seleccione ${second.title}`,
                value: '',
            },
        ];
        if (!firstDropdownValue) {
            return defaultDropdown;
        }
        console.log('Reached here');
        const secondValues = second?.values[firstDropdownValue];
        console.log('Second values is', secondValues);
        if (!secondValues) {
            console.error("Second Dropdown is not found from the first one");
            return defaultDropdown;
        }

        return secondValues?.map(s => ({
            label: s,
            value: s,
        }));
    }, [second, firstDropdownValue]);

    const submit = () => {
        if (!firstDropdownValue || !secondDropdownValue) {
            return;
        }
        const firstEntity = first.entity;
        const secondEntity = second.entity;
        const formedPayload =
            payload +
            `{"${firstEntity}": "${firstDropdownValue}", "${secondEntity}": "${secondDropdownValue}"}`;
        console.log('Formed Payload is ', formedPayload);
        chooseReply(formedPayload, `${firstDropdownValue} ${secondDropdownValue}`);
    };

    return (
        <>
            {title}
            <br />
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
            <button
                type="button"
                onClick={submit}
                disabled={!firstDropdownValue || !secondDropdownValue}
            >
                Enviar
            </button>
        </>
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
        console.log('Reached Dispatch To Props', payload, title);
        dispatch(addUserMessage(title));
        dispatch(emitUserMessage(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownDual);
