import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* AddNewLocationSaga() {
    yield takeEvery('ADD_NEW_LOCATION', AddNewLocation);
}

function* AddNewLocation(action) {
    try {
        const response = yield axios.post('/api/location', action.payload);
        console.log('response.data:', response.data);
        yield put({type: 'SET_LIST', payload: action.payload});
    } catch(error) {
        console.log('NewLocation post failed', error);
    }
}

export default AddNewLocationSaga;