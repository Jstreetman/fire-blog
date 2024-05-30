enum SignUpError {
  EmailAlreadyInUse = "Email address already in use",
  WeakPassword = "Password must be at least 10 characters",
  InvalidCredentials = "Invalid credentials",
}

enum Success {
  SuccessMessage = "You have successfully signed up!",
}

enum SignInError {}

export { SignUpError, Success };
