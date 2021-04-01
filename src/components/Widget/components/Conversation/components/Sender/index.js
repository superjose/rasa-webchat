// @ts-check
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Send from 'assets/send_button';
import './style.scss';

/**
 * This file was modified from its original version.
 * This one improves it by removing all the unnecessary form submission process
 * and handling it directly via a function. 
 * 
 * It's much more efficient and Firefox doesn't warn you about any Form submission
 * errors.
 * @param  param0 
 * @returns 
 */
const Sender = ({ sendMessage, inputTextFieldHint, disabledInput, userInput }) => {
    const [inputValue, setInputValue] = useState('');
    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function handleSubmit(e) {
        sendMessage(e);
        setInputValue('');
    }

    function onEnterPress(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage(e);
        }
        // https://stackoverflow.com/a/4429785/1057052
        return false;
    }

    function handleSendMessage(e) {
        handleSubmit({
            ...e,
            target: {
                message: {
                    value: inputValue,
                },
            },
        });
    }

    return userInput === 'hide' ? (
        <div />
    ) : (
        <div className="rw-sender">
            <TextareaAutosize
                type="text"
                minRows={1}
                onKeyDown={onEnterPress}
                maxRows={3}
                onChange={handleChange}
                value={inputValue}
                className="rw-new-message"
                name="message"
                placeholder={inputTextFieldHint}
                disabled={disabledInput || userInput === 'disable'}
                autoFocus
                autoComplete="off"
            />
            <button
                type="button"
                onClick={handleSendMessage}
                className="rw-send"
                disabled={!(inputValue && inputValue.length > 0)}
            >
                <Send
                    className="rw-send-icon"
                    ready={!!(inputValue && inputValue.length > 0)}
                    alt="send"
                />
            </button>
        </div>
    );
};
const mapStateToProps = state => ({
    inputTextFieldHint: state.behavior.get('inputTextFieldHint'),
    userInput: state.metadata.get('userInput'),
});

Sender.propTypes = {
    sendMessage: PropTypes.func,
    inputTextFieldHint: PropTypes.string,
    disabledInput: PropTypes.bool,
    userInput: PropTypes.string,
};

export default connect(mapStateToProps)(Sender);
