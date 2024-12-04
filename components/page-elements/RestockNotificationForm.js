import React, { Component } from 'react';
import { toast } from 'sonner'; // Ensure this is correctly imported

class RestockNotificationForm extends Component {
  state = {
    message: '',
    email: '',
  };

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;

    toast.success('Signing you up for restock notifications...', {
      duration: 2000, // Adjust the duration as needed
    });

    const res = await fetch('/api/subscribeForRestock', {
      body: JSON.stringify({
        email // Only email is needed now
      }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
    });

    const result = await res.json();

    if (res.ok) {
      toast.success('Successfully signed up for notifications!');
    } else {
      toast.error('There was a problem signing you up.');
    }

    this.setState({ message: result.message, email: '' });
  };

  render() {
    const { message, email } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="flex flex-row gap-2 w-full mb-4">
        <div className="w-full md:flex-grow">
          <input
            type="email"
            value={email}
            onChange={this.handleChange}
            className="w-full h-14 bg-transparent rounded-2xl border-1 border-gray-500 px-3 py-2"
            placeholder="Enter your email to get notified"
            required
          />
        </div>

        <div className="flex">
          <button
            type="submit"
            className="text-base px-8 h-14 bg-neutral-800 text-white rounded-2xl hover:bg-black transition-colors duration-200"
          >
            Submit
          </button>
        </div>
        
      </form>
    );
  }
}

export default RestockNotificationForm;
