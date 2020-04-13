import axios from 'axios'

export const getTweets=(tweets)=>{
    return{
        type:'GET_TWEETS', payload:tweets
    }
}

export const startGetTweets=(name)=>{
    return(dispatch)=>{
        axios.get(`http://localhost:3060/twitterSearch/${name}`)
        .then((response)=>{
            console.log(response.data)
            const tweets = response.data
            dispatch(getTweets(tweets))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const startMergeTweets=(tweets)=>{
    console.log(tweets)
    return{
        type:'MERGE_TWEETS',
        payload:tweets
    }
}



