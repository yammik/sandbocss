import { SET_MODE, ADD_DIV, SET_CURRENT_DIV } from './types';


// action creators
export function setMode(mode) {
  return { type: SET_MODE, mode }
}

export function addDiv(div) {
  return { type: ADD_DIV, div }
}

export function setCurrentDiv(id) {
  return { type: SET_CURRENT_DIV, id }
}
