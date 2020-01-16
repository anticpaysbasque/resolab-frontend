const initialAlertState = {
  alert: {}
};

const alertReducer = (state = initialAlertState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { alert: action.payload.alert };
    case REMOVE_ALERT:
      return initialAlertState;
    default:
      return state;
  }
};

export default alertReducer;
