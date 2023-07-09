// function that takes in an error object and returns the error message
import { CustomError } from './types';

export const getErrorMessage = (error: CustomError) => {
    console.log(error);

    // switch statement that returns the error message based on the error code
    switch (error.code) {
        case 'UserNotFoundException': {
            return 'User does not exist.';
        }
        case 'NotAuthorizedException': {
            return 'Incorrect username or password.';
        }
        case 'UsernameExistsException': {
            return 'Username already exists.';
        }
        case 'InvalidPasswordException': {
            return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.';
        }
        case 'InvalidParameterException': {
            return 'Username must be a valid email address.';
        }
        case 'CodeMismatchException': {
            return 'Invalid verification code provided, please try again.';
        }
        case 'ExpiredCodeException': {
            return 'Verification code has expired, please request a new one.';
        }
        case 'LimitExceededException': {
            return 'Attempt limit exceeded, please try again later.';
        }
        case 'UserNotConfirmedException': {
            return 'User is not confirmed. Please confirm your account.';
        }
        default: {
            return 'An error has occurred.';
        }
    }
};
