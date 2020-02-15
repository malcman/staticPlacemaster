import { navigate } from 'gatsby';

// Placement Actions (Async)
export const INVALIDATE_PLACEMENT = 'INVALIDATE_PLACEMENT';
export const REQUEST_PLACEMENT = 'REQUEST_PLACEMENT';
export const RECEIVE_PLACEMENT = 'RECEIVE_PLACEMENT';
export const LOAD_PLACEMENT = 'LOAD_PLACEMENT';
// Placement Actions (synchronous)
export const UPDATE_TITLE = 'UPDATE_TITLE';

export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    title,
  };
}

export function invalidatePlacement() {
  return {
    type: INVALIDATE_PLACEMENT,
  };
}

export function receivePlacement(data) {
  return {
    type: RECEIVE_PLACEMENT,
    data,
  };
}

export function requestPlacement(formData) {
  return {
    type: REQUEST_PLACEMENT,
    formData,
  };
}

// function updateGroupData(allGroups, groupData, member = null) {
//   // if this groupID is not yet in group data,
//   // create appropriate object
//   // regardless, add new member to group
//   const groupID = groupData.group_id;
//   if (!allGroups.hasOwnProperty(groupID)) {  // eslint-disable-line
//     allGroups[groupID] = {
//       members: [],
//       size: 0,
//       time: groupData.time,
//       campus: groupData.campus,
//       gradStanding: groupData.grad_standing,
//     };
//   }
//   if (member) {
//     allGroups[groupID].members.push(member);
//     allGroups[groupID].size += 1;
//   }
// }

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
