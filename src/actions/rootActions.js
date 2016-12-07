const debounceActionCreator = (action, delay = 250) => { //eslint-disable-line no-unused-vars
  let data = [];
  let timeout = null;
  return arg1 => dispatch => {
    data.push(arg1);
    clearTimeout(timeout);
    timeout = setTimeout(() => { dispatch(action(data)); data = []; }, delay);
  };
};

export const displayMessage = message => ({type: 'SEND_MESSAGE', message});