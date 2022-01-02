import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* AddNewLocationSaga() {
    yield takeEvery('ADD_NEW_LOCATION', addNewLocation);
    yield takeEvery('DELETE_LOCATION', deleteLocation);
    yield takeEvery('EDIT_LOCATION', editLocation);
}

function* addNewLocation(action) {
    try {
        console.log('in addNewLocation action.payload:', action.payload);
        const response = yield axios.post('/api/location', action.payload);
        console.log('response.data:', response.data);
        yield put({ type: 'GET_LIST_DETAILS', payload: action.payload.listID });
    } catch (err) {
        console.log('new location post failed', err);
    }
}

function* deleteLocation(action) {
    try {
        const response = yield axios.delete(`/api/location/${action.payload.locationID}`);
        yield put({ type: 'GET_LIST_DETAILS', payload: action.payload.listID });
    } catch (err) {
        console.log('error deleting location', err);
    }
}

function* editLocation(action) {
    try {
        console.log('action.payload:', action.payload);
        const response = yield axios.put(`/api/input/${action.payload.id}/`, action.payload);
        yield put({ type: 'GET_LIST_DETAILS', payload: action.payload.listID });
    } catch (err) {
        console.log('edit location put failed', err);
    }
}

export default AddNewLocationSaga;