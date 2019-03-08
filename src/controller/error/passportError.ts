/**
 * username or password incorrect
 */
class usernameOrPasswordIncorrectError extends Error {
    constructor() {
        let message = 'Username or Password Incorrect!';
        super(message);
        this.name = 'usernameOrPasswordIncorrectError';
    }
}

/**
 * username or password invalid
 */
class usernameOrPasswordInvalidError extends Error {
    constructor() {
        let message = 'Username or Password Invalid!';
        super(message);
        this.name = 'usernameOrPasswordInvalidError';
    }
}

/**
 * email invalid
 */
class emailInvalidError extends Error {
    constructor() {
        let message = 'Email Invalid!';
        super(message);
        this.name = 'emailInvalidError';
    }
}

/**
 * Database Error
 */
class databaseError extends Error {
    constructor() {
        let message = 'Database Error!';
        super(message);
        this.name = 'databaseError';
    }
}

export {
    usernameOrPasswordIncorrectError,
    usernameOrPasswordInvalidError,
    emailInvalidError,
    databaseError
}