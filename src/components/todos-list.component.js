import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FormDialog from "../components/create-dialog.component";

const Todo = props => (
    <tr>
        <td>{props.todo.todo}</td>
        <td>{props.todo.status}</td>
        <td>{props.todo.category}</td>
        <td>
            <FormDialog old={props.todo} buttonName={"Edit"} AddDialogTitle={"Edit todo Item"} />
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        axios.get('https://todoappnewfor.herokuapp.com/todos/')
            .then(response => {
                this.setState({ todos: response.data });
                console.log(response.data + "Data");
            })

            .catch(function (error) {
                console.log(error);
            })

    }

    componentDidUpdate() {
        axios.get('https://todoappnewfor.herokuapp.com/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }


    render() {
        return (
            <div className="container">

                <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-sm-3" >
                        <div className="AddItem mb-2">
                            <FormDialog buttonName={"+ Add Task"} AddDialogTitle={"Add todo Item"} />
                        </div>
                        <div className="btn-group-vertical FullWidth">
                            <button type="button" className="btn btn-dark mt-1 mb-1 p-1">All Tasks</button>
                            <button type="button" className="btn btn-dark mt-1 mb-1 p-1" >Ongoing</button>
                            <button type="button" className="btn btn-dark mt-1 mb-1 p-1">Achieved</button>
                        </div>
                    </div>
                    <div className="col-sm-9 TableBg">
                        <table className="table table-striped table-hover" >
                            <thead >
                                <tr>
                                    <th>Todo</th>
                                    <th>Status</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.todoList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}