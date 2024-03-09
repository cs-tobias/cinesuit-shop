import React, { Component } from 'react';
import { toast } from "sonner"

class ConvertkitEmailForm extends Component {
  state = {
    message: '',
    email: '',
  };

  emailHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  subscribeUser = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    const { email } = this.state;
    const { productTitle } = this.props; // Assuming productTitle is passed as a prop for tagging purpose

    // Show toast here for immediate feedback upon clicking Submit
    toast.success('Signing you up...', {
      duration: 2000, // duration of the toast
    });

    const res = await fetch('/api/ConvertkitSubscribe', {
      body: JSON.stringify({
        email: email,
        productTitle: productTitle, // Use the product title for tagging
      }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
    });

    const json_res = await res.json();

    if (res.ok) {
      // Show success message
      toast.success('Successfully signed up!');
    } else {
      // Show error message
      toast.error('There was a problem with your signup.');
    }

    this.setState({
      message: json_res.message,
      email: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.subscribeUser} className="mt-8 flex md:flex-row gap-4 w-full">
        <div className="w-full md:flex-grow">
          <input
            id="newsletter-input"
            type="email"
            name="email"
            className="w-full h-14 bg-transparent rounded-2xl border-2 border-gray-800 px-3 py-2"
            placeholder="Enter your email"
            aria-label="Enter Email Address"
            value={this.state.email}
            onChange={this.emailHandler}
            required
          />
        </div>

        <div className="">
          <button
            id="newsletter-btn"
            type="submit"
            className="w-full px-8 h-14 bg-neutral-200 text-black rounded-2xl hover:bg-white transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default ConvertkitEmailForm;
