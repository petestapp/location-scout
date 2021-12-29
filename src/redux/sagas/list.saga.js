import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getListSaga() {
    yield takeEvery('GET_LIST_DETAILS', getList);
    yield takeEvery('ADD_NEW_LIST', addNewList);
}

function* getList(action) {
    console.log(`in getList:`, action.payload);
    try {
        const response = yield axios.get('/api/list/', {params: {id: action.payload.id}});
        console.log("response.data", response.data);
        yield put({type: 'SET_LIST', payload: response.data});
    } catch(err) {
        console.log('list get request failed', err);
    }
}

function* addNewList(action) {
    console.log(`in addList:`, action.payload);
    try {
        const response = yield axios.post('/api/list/', action.payload);
        yield put({type: 'GET_LIST', payload: action.payload});
    } catch(err) {
        console.log('list post request failed', err);
    }
}

export default getListSaga;