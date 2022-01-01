import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* AddNewLocationSaga() {
    yield takeEvery('ADD_NEW_LOCATION', addNewLocation);
    yield takeEvery('DELETE_LOCATION', deleteLocation);
}

function* addNewLocation(action) {
    try {
        console.log('in addNewLocation action.payload:', action.payload);
        const response = yield axios.post('/api/location', action.payload);
        console.log('response.data:', response.data);
        yield put({ type: 'GET_LIST_DETAILS', payload: action.payload.listID });
    } catch (error) {
        console.log('new location post failed', error);
    }
}

function* deleteLocation(action) {
    try {
        const response = yield axios.delete(`/api/location/${action.payload}`);
        yield put({ type: 'GET_LIST_DETAILS', payload: action.payload });
    } catch (err) {
        console.log('error deleting location', err);
    }
}

export default AddNewLocationSaga;