// @ts-check
/**
 * Custom JavaScript file from Codemera that parses the payload and detects
 * whether a _custom_action_ is sent.
 *
 * If it does, then it will try to execute the onButtonAction prop.
 *
 * @param payload The payload property from the reply - reply.get('payload')
 */

export function parsePayload(payload, onButtonAction) {
    // Reversed if - will return the payload if _custom_action_ is not found.
    if (!payload.includes('_custom_action_')) {
        return payload;
    }

    // Executes the onButtonAction if it's set and _custom_action_ exists
    if (typeof onButtonAction === 'function') {
        onButtonAction();
    }

    const [, parsedPayload] = payload.split('/');
    return '/' + parsedPayload;
}
