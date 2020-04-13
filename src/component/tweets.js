import React from 'react'
import io from "socket.io-client";
import {connect} from 'react-redux'
import {startGetTweets} from '../actions/tweetsActions'
import {startMergeTweets} from '../actions/tweetsActions'

class TweetsSearch extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            newTweets:[],
            count:10
        }
    }
 componentDidMount=()=>{
        this.socket = io('localhost:3060');
        this.socket.on('connect',()=>{
         console.log('connected');
        })
        this.socket.on('getTweets',(data)=>{
            const tweet= {
                text:data.text,
                id:data.id_str,
                name:data.user.name,
                userScreenName: "@" + data.user.screen_name,
                time:data.created_at.slice(4,19)
            }
            var newArray = this.state.newTweets;
            newArray.unshift(tweet)
            this.setState({newTweets:newArray})
           // console.log(data);
        })
    }
    handleButton=()=>{
        const tweets = this.state.newTweets
        this.props.dispatch(startMergeTweets(tweets))
        this.setState({newTweets:[]})
    }
    handleChange=(e)=>{
        const name = e.target.value
        this.setState({name})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
          const name = this.state.name
           console.log(name)
           if(name==''){
               alert('input feild cannot be empty')
           }
           else{
            this.props.dispatch(startGetTweets(name));
            this.socket.emit('getTweets', name);
           }
           //this.setState({name:''})
    }
    handleClick=()=>{
        this.setState((prevState)=>{
            if(prevState.count==this.props.tweets.length){
                alert('nothing to load')
            }
            else{
                return ({count:prevState.count+20})
            }
        })
    }

    render(){
        return(
            <div className="container">
                 <center>Welcome to the Tweets Search app</center>
                <div className="row">
                <div className="col-md-6 offset-md-3">
               <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="search">Search Tweets</label>
                        <input type="text" id="search" className="form-control" value={this.state.name} onChange={this.handleChange} />
                    </div>
                   
                   <center><input className="btn btn-primary" type="submit" value="submit" /></center> 
                    <br/>
                    <br/>
                </form>
              
              {this.props.tweets.length!==0&&  this.state.newTweets.length > 0 && <p>{ this.state.newTweets.length >0 && (<center><button className="btn btn-primary" onClick={this.handleButton}>Show New Tweets {this.state.newTweets.length}</button></center>)}</p>  } 
              {/* {this.state.showTweets&&this.state.newTweets.map(tweet=><p key={tweet.id}>{tweet.text},{tweet.user.screen_name}</p>)} */}
                {this.props.tweets.length!==0&&<center><p>Showing Tweets </p></center>}
                {this.props.tweets.length!==0&&this.props.tweets.map((tweet,i)=>(<div>{
                    i<this.state.count&&<center><div className="card" style={{width: '35rem'}}>
                    <div className="card-body">
                       <div><h6>Name:{tweet.name}</h6></div> 
                        <p>{tweet.userScreenName}</p>
                        <p className="card-text">Body:{tweet.text}</p>        
                    </div>   
                </div> </center>                 
                }</div>)
                )}
                <br/>
                <br/>
              {this.props.tweets.length>this.state.count&&<center><button className="btn btn-success" onClick={this.handleClick} >LoadMore</button></center>}  
            </div>
         </div>
                </div> 
        )
    }
}

const mapStateToProps=(state)=>{
 return{
        tweets:state.tweets
    }
}

export default connect(mapStateToProps)(TweetsSearch)