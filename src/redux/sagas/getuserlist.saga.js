import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import userList from '../reducers/userlist.reducer';
import { authenticate } from 'passport';

function* getUserListSaga() {
    yield takeEvery('GET_USER_LIST', getUserList);
}

function* getUserList() {
    try {
        const config = {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        };
        const response = yield axios.get('/api/userlist', config);
        yield put({type: 'SET_USER_LIST', payload: response.data});
    } catch(error) {
        console.log('Userlist get request failed', error);
    }
}

export default getUserListSaga;