import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import axios from 'axios'

class App extends Component {
	constructor(){
		super()
		this.state = {
			taskArray: ''
		}
	}
	taskAdded(task, date){
		console.log(task, date)
		axios({
			method: 'POST',
			url: 'http://localhost:3000/addTask',
			data: {
				taskName: task,
				taskDate: date
			}
		}).then((backEndResponse)=>{
			backEndResponse.data.map((data)=>{
				this.setState({
					taskArray: data.taskName
				})
			})
			// this.setState({
				// taskArray: backEndResponse
			// })
		})
	}
	render() {
		console.log(this.state.taskArray)
		return (
			<Router>
				<div className="App">
					<NavBar/>
					<Route exact path="/" render={()=>{
						return (
							<Home taskAdded={this.taskAdded}  />
						)	
					}}/>
				</div>
			</Router>
		);
	}
}

export default App;
