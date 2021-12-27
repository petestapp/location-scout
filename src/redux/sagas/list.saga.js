import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getListSaga() {
    yield takeEvery('GET_LIST_DETAILS', getList);
}

function* getList(action) {
    console.log(`in getList:`, action.payload);
    try {
        const response = yield axios.get('/api/list/', {params: {id: action.payload.id}});
        console.log("response.data", response.data);
        yield put({type: 'SET_LIST', payload: response.data});
    } catch(error) {
        console.log('list get request failed', error);
    }
}

export default getListSaga;