import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getListSaga() {
    yield takeEvery('GET_LIST_DETAILS', getList);
    yield takeEvery('ADD_NEW_LIST', addNewList);
    yield takeEvery('DELETE_LIST', deleteList);
}

function* getList(action) {
    console.log(`in getList: action.payload:`, action.payload);
    try {
        const response = yield axios.get('/api/list/', { params: { id: action.payload } });
        console.log("response.data", response.data);
        yield put({ type: 'SET_LIST', payload: response.data });
    } catch (err) {
        console.log('list get request failed', err);
    }
}

function* addNewList(action) {
    console.log(`in addList:`, action.payload);
    try {
        const response = yield axios.post('/api/list/', action.payload);
        yield put({ type: 'GET_LIST', payload: action.payload });
    } catch (err) {
        console.log('list post request failed', err);
    }
}

function* deleteList(action) {
    try {
        console.log('action.payload:', action.payload);
        const response = yield axios.delete(`/api/list/${action.payload.listID}`, action.payload);
        yield put({ type: 'GET_USER_LIST', payload: action.payload.userID });
    } catch (err) {
        console.log('error deleting location', err);
    }
}
export default getListSaga;