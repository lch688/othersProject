import {put, takeEvery } from 'redux-saga/effects';
import {init_data} from './actionCreator';
import {SAGA_ACTION} from './actionType';
import axios from 'axios';



function* getinitlist() {
  try{
    const res = yield axios.get('/api/list');
  
    const action=init_data(res.data)
    yield put(action)
  
  }catch(e){
    console.log(e)
  }
  

}


function* mySaga() {
    yield takeEvery(SAGA_ACTION,getinitlist)
  }
  
  export default mySaga