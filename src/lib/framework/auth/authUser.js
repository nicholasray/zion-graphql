class AuthUser {
  constructor(token) {
    this.token = token;
  }

  isAdmin() {
    if (this.token.roles) {
      return this.token.roles.indexOf('admin') > -1;
    }

    if (this.token.scope) {
      return this.token.scope.split(' ').indexOf('write') > -1;
    }

    return false;
  }
}

module.exports = AuthUser;
