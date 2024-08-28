export const DASHBOARD = '/dashboard';
// export const DASHBOARD_user_id = '/dashboard/:user_id';


export const ID = `id`;


export const AUTH = '/auth';
export const LOGIN = AUTH + '/login';
export const FORGOT_PASSWORD = AUTH + '/forgot-password';
export const SIGN_UP = AUTH + '/signup';
export const OPT_VERIFICATION = AUTH + "/otp-verificatin/:signupId";
export const RESET_PASSWORD = "/auth/reset-password";
export const RESET_PASSWORD_ID = "/auth/reset-password/:id";


export const USER = '/user';
export const USER_PROFILE_REGISTER_APPLICANT = USER + '/register_applicant';
export const APPLICATION = USER + '/application';
// export const APPLICATION_HEALTH = APPLICATION + "/health";

export const APPLICATION_HEALTH = APPLICATION + "/health";

export const APPLICATION_EDUCATION = APPLICATION + "/education";
export const USER_PROFILE_BASIC_DATA_WITHOUT_HOUSEHOLD_INCOME = USER +'/basic_data_without_household_income';
export const USER_PROFILE_BASIC_DATA_WITH_HOUSEHOLD_INCOME = USER +'/basic_data_with_household_income';
export const SUBMISSION = USER + '/submission';
export const UPDATE_PROFILE = USER + '/update-profile';
export const OVERVIEW = USER + "/overview";
