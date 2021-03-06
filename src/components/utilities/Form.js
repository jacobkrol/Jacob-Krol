import React from 'react';
import '../../styles/Form.css';

class Form extends React.Component {
    state = {
        name: '',
        email: '',
        title: '',
        details: '',
        disabled: false
    };

    handleChange = (evt) => {
        //update state with changed input value
        this.setState({[evt.target.name]: evt.target.value});
    }

    handleSubmit = (evt) => {
        //do not submit if already processing submission
        if(this.state.disabled) return;
        //flag the api call to disable the submit button
        this.setState({disabled: true});
        //define headers for api fetch
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        };
        //define variables needed for user feedback
        let status = null;
        const errText = "An error has occurred submitting your feedback. Please verify your internet connection and try again later.\n\nError Code: ";
        //make api fetch call to server
        fetch('https://jacob-krol.herokuapp.com/add',requestOptions)
            //save http status, return response text
            .then(res => {
                status = res.status;
                return res.text();
            })
            //handle server response text
            .then(text => {
                text==="success"
                ? alert("Your message has been successfully sent. Thank you for reaching out!")
                : text==="error"
                    ? alert(errText+"E1-"+(status ? String(status) : "0"))
                    : alert(errText+status);
                this.setState({disabled: false});
            })
            //handle no server response
            .catch(err => {
                console.log(err);
                alert(errText+"E2-"+(status ? String(status) : "0"));
                this.setState({disabled: false});
            });
        //prevent default form behavior
        evt.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Your Name:</label>
                <input type="text" name="name" onChange={this.handleChange} value={this.state.name} disabled={this.state.disabled} required />
                <label>Your Email:</label>
                <input type="email" name="email" placeholder="name@example.com" onChange={this.handleChange} value={this.state.email} disabled={this.state.disabled} required />
                <label>Subject:</label>
                <input type="text" name="title" className="extend" onChange={this.handleChange} value={this.state.title} disabled={this.state.disabled} required />
                <label>Message Details:</label>
                <textarea name="details" className="extend" placeholder="what's up?" onChange={this.handleChange} value={this.state.details} disabled={this.state.disabled} required />
                <input type="submit" disabled={this.state.disabled} />
            </form>
        )
    }
}

export default Form;
