class AuthService {
  constructor() {
    this.adminPassword = 'admin123'
  }

  validarPassword(password) {
    return password === this.adminPassword
  }
}

export default AuthService
