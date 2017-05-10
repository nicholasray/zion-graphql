class AuthUser {
  constructor(token) {
    this.token = token;
  }

  isAdmin() {
    return this.token.roles.indexOf('admin') > -1;
  }
}

module.exports = AuthUser;
