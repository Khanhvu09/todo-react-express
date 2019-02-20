import React, {Component} from 'react'
import axios from 'axios';
import moment from 'moment'

class Edit extends Component{
    constructor(){
        super()
        this.state = {
            task: {}
        }
    }
    componentDidMount(){
        // console.log(this.props.match.params.id)
        const tid = this.props.match.params.id
        // console.log(tid)
        axios({
            method: 'GET',
            url:   `http://localhost:3000/getTask/${tid}`
        }).then((taskFromBackEnd)=>{
            this.setState({
                data: taskFromBackEnd.data
            })
        })
    }

    changeTask = (event)=>{
        const value = event.target.value;
        const taskstateCopy = {...this.state.task}
        // stateCopy is now: 
        // {taskName: 'oil change', taskDate: '2019-02-20'}
        // let stateCopy = Object.assign({},this.state.task)
        taskstateCopy.taskName = value;
        this.setState({
            task: taskstateCopy
        })
    }

    changeDate = (event)=>{
        const value = event.target.value;
        const taskstateCopy = {...this.state.task}
        taskstateCopy.taskDate = value;
        this.setState({
            task: taskstateCopy
        })
    }

    editTask = (event)=>{
        event.preventDefault()
        axios({
            method: 'POST',
            data: {
                task: this.state.task,
                id: this.props.match.params.id
            },
            url: `http://localhost:3000/edit/`
        }).then((jsonData)=>{
            console.log(jsonData.data)
            if(jsonData.data.msg === "updated"){
                // then the backend succeeded
                // moving on
                this.props.history.push('/')
            }
        })
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.editTask} className="add-box">
                    <input onChange={this.changeTask} type="text" id="new-task" placeholder="New Task" value={this.state.task.taskName}/>
                    <input onChange={this.changeDate} type="date" id="new-task-date" value={moment(this.state.task.taskDate).format('YYYY-MM-DD')}/>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>            
            </div>
        )
    }
}

export default Edit;