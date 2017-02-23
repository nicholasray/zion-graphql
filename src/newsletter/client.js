const axios = require('axios');

class Client {
  constructor() {
    this.dataCenter = process.env.MAILCHIMP_DATACENTER,
    this.client = axios;
    this.auth = {
      username: 'outtraverse',
      password: process.env.MAILCHIMP_API_KEY
    }
    this.root = `https://${this.dataCenter}.api.mailchimp.com/3.0`
  }

  subscribe(user, listId) {
    return this.client.post(`${this.root}/lists/${listId}/members`, {
      email_address: user.email,
      status: "subscribed",
    }, {
      auth: this.auth
    }).then(response => {
      console.log("Subscribed!");
      return response;
    }).catch(error => {
      console.log(error.response.data);
    })
  }
}

module.exports = Client;
