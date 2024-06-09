enum SignUpError {
  EmailAlreadyInUse = "Email address already in use",
  WeakPassword = "Password must be at least 10 characters",
  InvalidCredentials = "Invalid credentials",
  EmptyFields = "Please fill in all fields",
}

enum Success {
  SuccessMessage = "You have successfully signed up!",
  SuccessMessageLogin = "You have successfully logged in!",
}

enum SignInError {
  InvalidCredentials = "Invalid credentials",
  EmptyFields = "Please fill in all fields",
  IncorrectPassword = "Incorrect password",
  InvalidEmail = "Email address not found",
}

export { SignUpError, Success, SignInError };
