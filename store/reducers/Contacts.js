import { Contacts } from '../../data/SampleData';
import { favContacts } from '../../data/SampleData';

import { ADD_CONTACT } from '../actions/Contacts';
import { UPDATE_CONTACT } from '../actions/Contacts';
import { DELETE_CONTACT } from '../actions/Contacts';

const initialState = {
    contacts : Contacts,
    favContacts : favContacts
}

const contactsReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_CONTACT:
            if(action.isFavorite)
            {
                return { ...state, contacts: state.contacts.concat(action.contactToAdd), favContacts: state.favContacts.concat(action.contactToAdd) };
            }
            return { ...state, contacts: state.contacts.concat(action.contactToAdd)};
            
        case UPDATE_CONTACT:
            const updatedContacts = [...state.contacts];
            var indexToUpdate = updatedContacts.map(function(x) {return x.id; }).indexOf(action.contactToUpdate.id);
            if(indexToUpdate >= 0)
            {
                updatedContacts[indexToUpdate] = action.contactToUpdate;
            }

            const updatedFavContacts = [...state.favContacts];
            var indexToUpdateFav = updatedFavContacts.map(function(x) {return x.id; }).indexOf(action.contactToUpdate.id);
            if(indexToUpdateFav >= 0)
            {
                if(!action.isFavorite){
                    updatedFavContacts.splice(indexToUpdateFav, 1);
                }
                else{
                    updatedFavContacts[indexToUpdateFav] = action.contactToUpdate;
                }
            }
            else{
                if(action.isFavorite)
                {
                    updatedFavContacts.push(action.contactToUpdate);
                }
            }
            return { ...state, contacts: updatedContacts, favContacts: updatedFavContacts};
        case DELETE_CONTACT:

            const updatedContactsAfterDelete = [...state.contacts];
            var indexToDelete = updatedContactsAfterDelete.map(function(x) {return x.id; }).indexOf(action.contactId);
            if(indexToDelete >= 0)
            {
                updatedContactsAfterDelete.splice(indexToDelete, 1);
            }

            const updatedFavContactsAfterDelete = [...state.favContacts];
            var indexToDeleteFav = updatedFavContactsAfterDelete.map(function(x) {return x.id; }).indexOf(action.contactId);
            if(indexToDeleteFav >= 0)
            {
                updatedFavContactsAfterDelete.splice(indexToDeleteFav, 1);
            }

            return { ...state, contacts: updatedContactsAfterDelete, favContacts: updatedFavContactsAfterDelete};
        default:
            return state;
    }
}

export default contactsReducer;