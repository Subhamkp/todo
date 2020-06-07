import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

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

    componentDidMount() {
        axios.get('https://todoappnewfor.herokuapp.com/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo: response.data.todo,
                    status: response.data.status,
                    category: response.data.category
                })
            })
            .catch(function (error) {
                console.log(error)
            })
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
        const obj = {
            todo: this.state.todo,
            status: this.state.status,
            category: this.state.category
        };
        axios.post('https://todoappnewfor.herokuapp.com/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
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
                            value={this.state.status}
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
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}