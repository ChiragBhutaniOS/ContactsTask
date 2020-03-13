export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const addContact = (newContact, isFav) => {

    //Uncomment below code for using Redux-thunk
    // return async dispatch => {
    //     // any async code you want!
    //     const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
    //     const resData = await response.json();
    
    //     dispatch({ type: ADD_CONTACT, contactToAdd: newContact, isFavorite: isFav})
    // }

    return { type: ADD_CONTACT, contactToAdd: newContact, isFavorite: isFav};
};

export const updateContact = (updatedContact, isFav) => {
    return { type: UPDATE_CONTACT, contactToUpdate : updatedContact, isFavorite: isFav};
};

export const deleteContact = (id) => {
    return { type: DELETE_CONTACT, contactId: id};
};