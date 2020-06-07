import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoStatus = this.onChangeTodoStatus.bind(this);
        this.onChangeTodoCategory = this.onChangeTodoCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo: '',
            status: '',
            category: ''
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo: e.target.value
        });
    }

    onChangeTodoStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangeTodoCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo}`);
        console.log(`Todo Status: ${this.state.status}`);
        console.log(`Todo Category: ${this.state.category}`);

        const newTodo = {
            todo: this.state.todo,
            status: this.state.status,
            category: this.state.category
        }

        axios.post('https://todoappnewfor.herokuapp.com/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo: '',
            status: '',
            category: ''
        })
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Todo: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.state}
                            onChange={this.onChangeTodoStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeTodoCategory}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}