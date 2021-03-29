// @ts-check
import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUserMessage, emitUserMessage } from 'actions';
import { PROP_TYPES } from 'constants';
import { RenderedMessage } from '../RenderedMessage';
import { RenderedButton } from '../RenderedButton';

import './styles.scss';

const NUMBER_PER_PAGE = 5;

const MultiSelect = props => {
    const { chooseReply } = props;
    const { elements } = props.message.toJS();
    // Where value is an array of shape: [{id: string, name: string}]
    const { title, value, payload, entity } = elements;
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);

    // Splits the list into different groups:
    const { pages, totalPages } = useMemo(() => {
        const _pages = [];
        if (!value) {
            return { pages: [], totalPages: 0 };
        }
        // We get 5 elements per page.
        // This number (5) could be a prop.
        const totalPages = Math.min(Math.ceil(value.length / NUMBER_PER_PAGE), NUMBER_PER_PAGE);

        for (let i = 0; i < totalPages; i++) {
            const _page = value.slice(i * NUMBER_PER_PAGE, (i + 1) * NUMBER_PER_PAGE);
            _pages.push(_page);
        }
        return { pages: _pages, totalPages };
    }, [value]);

    const onChange = e => {
        const val = e.target.value;
        setSelected(_selected => {
            const copy = [..._selected];
            const valueIndex = copy.indexOf(val);
            if(valueIndex === -1) {
                return copy.concat(val);
            }
            return copy.filter(c => c !== val);
        });
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
        chooseReply(formPayload, valuesToDisplay.join(', '));
    };

    const goBack = () => {
        setPage(_page => {
            return _page === 0 ? 0 : _page - 1;
        });
    };
    const isLastPage = pages.length - 1 === page;
    const isFirstPage = page === 0;

    return (
        <div>
            <RenderedMessage> {title}</RenderedMessage>
            <div className="omni-multiselect">
                {pages[page].map(p => (
                    <div key={p.id}>
                        <label>
                            <input
                                id={p.id}
                                type="checkbox"
                                checked={(() => {
                                    const isSelected = selected.includes(p.id.toString());
                                    return isSelected;
                                })()}
                                value={p.id}
                                onChange={onChange}
                            />
                            {p.name}
                        </label>
                    </div>
                ))}
            </div>
            <br />
            <div>
                Pág. {page + 1}/{totalPages}
            </div>
            <div style={{ display: 'flex' }}>
                <RenderedButton type="button" onClick={goBack} disabled={isFirstPage}>
                    Atrás
                </RenderedButton>
                <RenderedButton type="button" onClick={continueOrSubmit}>
                    {isLastPage ? `Enviar` : 'Continuar'}
                </RenderedButton>
            </div>
        </div>
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
