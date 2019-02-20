import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import axios from 'axios'
import Edit from './Edit'


class App extends Component {
	constructor(){
		super()
		this.state = {
			taskArray: []
		}
	}

	componentDidMount(){
		axios({
			method: 'GET',
			url: 'http://localhost:3000/getTask',
		}).then((taskListFromBackEnd)=>{
			this.setState({
				taskArray: taskListFromBackEnd.data
			})
		})
	}
	
	taskAdded = (task, date) => {
		console.log(task, date)
		axios({
			method: 'POST',
			url: 'http://localhost:3000/addTask',
			data: {
				taskName: task,
				taskDate: date
			}
		}).then((backEndResponse)=>{
			this.setState({
				taskArray: backEndResponse.data
			})
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
							<Home taskAdded={this.taskAdded} taskArray={this.state.taskArray} />
						)	
					}}/>
					<Route exact path="/edit/:id" component={Edit}/>
				</div>
			</Router>
		);
	}
}

export default App;
