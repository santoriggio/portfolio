const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
    email: "Email",
    continue: "Continue",
    confirm: "Confirm",
    settings: "Settings",
  },
  help: {
    title: "Help",
  },
  user: {
    name: "Name",
    surname: "Surname",
    dob: "Date of birth",
    edit_profile: "Edit profile",
    bio: {
      title: "Bio",
      placeholder: "Write your bio",
    },
    location: {
      title: "Where?",
      placeholder: "Enter your city or your address",
    },
  },
  auth: {
    continue_with_apple: "Continue with Apple",
    continue_with_google: "Continue with Google",
    continue_with_email: "Continue with Email",
    signout: {
      button: "Signout",
      title: "Sign Out?",
      message:
        "By signing out, you’ll need to log in again to access your account. Do you want to continue?",
    },
    required_terms: {
      title: "Terms & Conditions",
      message:
        "To proceed, it is necessary to review the terms and conditions.",
    },
  },
  otp: {
    sended_otp_code: "Enter the code we sent to {{email}}",
    wrong_email: "Wrong Email?",
  },
  legal: {
    terms_conditions: "Terms & Conditions",
    accept_terms_conditions: "I accept the Terms & Conditions",
  },
  email: {
    title: "Enter your email",
    placeholder: "mario@rossi.com",
    description: "We will send a verification code to this email.",
  },
  password: {
    title: "Enter your password",
    placeholder: "Passwor ",
  },
  placeholders: {
    write_name: "Write your name",
    write_email: "mario@rossi.com",
  },
  onboarding: {
    name_not_editable: "Non potrà più essere modificato in seguito",
  },
};

export default en;
export type Translations = typeof en;
