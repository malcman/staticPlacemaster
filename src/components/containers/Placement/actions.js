import { navigate } from 'gatsby';

// Placement Actions (synchronous)
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const PLACE_MEMBER = 'PLACE_MEMBER';
// Placement Actions (Async)
export const INVALIDATE_PLACEMENT = 'INVALIDATE_PLACEMENT';
export const REQUEST_PLACEMENT = 'REQUEST_PLACEMENT';
export const RECEIVE_PLACEMENT = 'RECEIVE_PLACEMENT';
export const LOAD_PLACEMENT = 'LOAD_PLACEMENT';


// synchronous actions
export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    title,
  };
}

export function placeMember(groupNum, memberData) {
  // action creator to create member from memberData and
  // place that member in group indicated by groupNum
  return {
    type: PLACE_MEMBER,
    groupNum,
    memberData,
  };
}

// async actions
export function invalidatePlacement() {
  // error loading server response
  return {
    type: INVALIDATE_PLACEMENT,
  };
}

export function receivePlacement(data) {
  // handle response from server
  return {
    type: RECEIVE_PLACEMENT,
    data,
  };
}

export function requestPlacement(formData) {
  // send request to server with formData
  return {
    type: REQUEST_PLACEMENT,
    formData,
  };
}

export function fetchPlacement(formData, actionURL) {
  return (dispatch) => {
    // notify the store we have requested an async call
    dispatch(requestPlacement(formData));

    // send the form data to actionURL
    const xhr = new XMLHttpRequest();
    xhr.open('POST', actionURL, true);
    xhr.setRequestHeader('credentials', 'same-origin');
    xhr.onload = () => {
      // make sure all is kosher
      if (xhr.status >= 200 && xhr.status < 300) {
        // get JSON data to send to placement page
        const data = JSON.parse(xhr.response);
        dispatch(receivePlacement(data));
        // dispatch(loadPlacement(data));
        navigate('/placement/');
      }
    };
    xhr.onerror = () => {
      const alertText = 'There was a problem submitting the form.\n Please make sure the right files have been selected and try again.';
      window.alert(alertText);
      // this.props.backHandler(this.props.index);
      dispatch(invalidatePlacement());
    };
    xhr.send(formData);
  };
}
