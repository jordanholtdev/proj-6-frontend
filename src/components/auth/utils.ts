// function that takes in an error object and returns the error message
import { CustomError } from './types';

export const getErrorMessage = (error: CustomError) => {
    console.log(error);

    // if error is a NotAuthorizedException error (thrown by Cognito) return the error message
    if ('code' in error && error.code === 'NotAuthorizedException') {
        console.log(error['message']);
        return error['message'];
    } else {
        // if error is an InvalidParameterException error (thrown by Cognito) return the error message
        if ('code' in error && error.code === 'InvalidParameterException') {
            console.log(error['message']);
            return error['message'];
        } else {
            // if error is not a NotAuthorizedException or InvalidParameterException error, return a generic error message
            return 'An error has occurred. Please try again.';
        }
    }
};
