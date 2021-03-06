import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';



export default class FormDialog extends Component {

    constructor(props) {
        super(props);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoStatus = this.onChangeTodoStatus.bind(this);
        this.onChangeTodoCategory = this.onChangeTodoCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            open: false,
            todo: '',
            status: 'new',
            category: ''
        }
    }



    handleChange = (event) => {
        this.setState({
            status: event.target.value
        });
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

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

        if (this.props.old) {
            axios.post('https://todoappnewfor.herokuapp.com/todos/update/' + this.props.old._id, newTodo)
                .then(res => console.log(res.data));
        } else {
            axios.post('https://todoappnewfor.herokuapp.com/todos/add', newTodo)
                .then(res => console.log(res.data));
        }

        this.setState({
            todo: '',
            status: '',
            category: '',
            open: false
        })
    }

    componentDidMount() {
        if (this.props.old) {
            console.log(this.props.old.category + " worked");
            this.setState({
                todo: this.props.old.todo,
                status: this.props.old.status,
                category: this.props.old.category,
            })
        }
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary mt-2" onClick={this.handleClickOpen}>{this.props.buttonName}</button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.AddDialogTitle}</DialogTitle>
                    <DialogContent>
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
                                <input type="submit" value="Save" className="btn btn-primary" />
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
