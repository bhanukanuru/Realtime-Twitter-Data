const initialState=[]

const tweetsReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'GET_TWEETS':{
            return [].concat(...action.payload)
        }
        case 'MERGE_TWEETS':{
            //console.log('get', action.payload)
            return [].concat(action.payload, state)
        }
        default:{
            return state
        }
    }
}

export default tweetsReducer