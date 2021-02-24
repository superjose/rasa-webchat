import React, { memo } from 'react';

/**
 * A custom component that wraps the rendered button
 * This shouldn't be done this way, but time was lacking and
 * direct solutions were needed.
 *
 * The same solution was applied to RenderedMessage
 *
 */

export const RenderedButton = memo(props => {
    const { onClick, disabled, type } = props;
    return (
        <>
            <button
                className={'rw-reply'}
                type={type || 'button'}
                disabled={disabled}
                onClick={onClick}
            >
                {props.children}
            </button>
        </>
    );
});

export default RenderedButton;
