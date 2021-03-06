import consts from './ActionTypes';
// helpers
import {generateTimestamp} from '../helpers/index';

export function comment(text, username, timestamp) {
  return {
    type: consts.ADD_COMMENT,
    modifiedTimestamp: timestamp,
    text,
    userName: username
  };
}

/**
 * @description this action adds a comment to the current check.
 * @param {string} text - comment text.
 * @param {string} username - Alias name.
 * @return {object} New state for comment reducer.
 */
export const addComment = (text, username) => {
  return ((dispatch, getState) => {
    let state = getState();
    let contextId = state.contextIdReducer.contextId;
    dispatch(comment(text, username, generateTimestamp()));
    dispatch({
      type: consts.TOGGLE_COMMENTS_IN_GROUPDATA,
      contextId,
      text
    });
  });
};
