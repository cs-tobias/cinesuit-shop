//ConvertkitCustomMessage.js
import React, { Component } from 'react';
import { toast } from "sonner"

class ConvertkitCustomMessage extends Component {
  state = {
    email: '',
    message: '', // Updated to include only one message state
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  subscribeUser = async (e) => {
    e.preventDefault();
    const { email, message } = this.state; // Keep using 'message' for internal state
  
    toast.success('Sending request...', {
      duration: 2000,
    });
    console.log({ email, lensRequest: message }); // This should log the email and message being sent

    const res = await fetch('/api/ConvertkitCustomMessageSubscribe', {
      body: JSON.stringify({
        email: this.state.email,
        message: this.state.message, // No change here, just make sure the server handles it correctly
      }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
    });
  
    const json_res = await res.json();

    if (!res.ok) {
      console.error('Signup error:', json_res.message || 'Unknown error');
      toast.error(json_res.message || 'There was a problem with your signup.');
      return;
    }
    
    toast.success('Request sent! Check your email for verification.');
  
    // Reset email and message states
    this.setState({
      email: '',
      message: '' // Reset both fields after submission
    });
  };

  render() {
    return (
      <form onSubmit={this.subscribeUser} className="mt-8 flex w-full">
      <div className="flex-grow">
        <textarea
          id="message-input"
          name="message"
          className="w-full h-full bg-transparent rounded-2xl border-2 border-gray-300 px-3 py-2"
          placeholder="Your lens request"
          aria-label="Your lens request"
          value={this.state.message}
          onChange={this.handleInputChange}
          required
        />
      </div>
      <div className="flex flex-col justify-between ml-4 gap-2">
        <input
          id="email-input"
          type="email"
          name="email"
          className="h-14 bg-transparent rounded-2xl border-2 border-gray-300 px-3 py-2"
          placeholder="Enter your email"
          aria-label="Enter Email Address"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <button
          id="submit-btn"
          type="submit"
          className="h-14 bg-neutral-800 text-white rounded-2xl hover:bg-black transition-colors duration-200"
        >
          Submit
        </button>
      </div>
    </form>
    );
  }
}

export default ConvertkitCustomMessage;