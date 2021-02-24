import React, { memo } from 'react';

/**
 * A custom component that wraps the rendered items for the classes.
 * This shouldn't be done this way, but time was lacking and
 * direct solutions were needed.
 */
export const RenderedMessage = memo(props => {
    return (
        <>
            <div className="rw-group-message rw-from-response">
                <div className="rw-message undefined">
                    <div className="rw-response">
                        <div className="rw-message-text">
                            <div className="rw-markdown">
                                <p>{props.children}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default RenderedMessage;
