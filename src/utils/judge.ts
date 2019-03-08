/**
 * Username Invalid
 */
class usernameInvalidError extends Error {
    constructor() {
        let message = 'Username Invalid!';
        super(message);
        this.name = 'usernameInvalidError';
    }
}

/**
 * Password Invalid
 */
class passwordInvalidError extends Error {
    constructor() {
        let message = 'Password Invalid!';
        super(message);
        this.name = 'passwordInvalidError';
    }
}

/**
 * Email Invalid
 */
class emailInvalidError extends Error {
    constructor() {
        let message = 'Email Invalid!';
        super(message);
        this.name = 'emailInvalidError';
    }
}

/**
 * judgeUsername
 * @param username
 */
let judgeUsername = function (username: string) {
    let strExp = /^\w{4,16}$/;

    if (!strExp.test(username)) {
        throw new usernameInvalidError();
    }
};

/**
 * judgePassword
 * 8-20字符，至少包含大小写字母和数字，不包含特殊字符
 * @param password
 */
let judgePassword = function (password: string) {
    let strExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

    if (!strExp.test(password)) {
        throw new passwordInvalidError();
    }
};

/**
 * judgeEmail
 * @param email
 */
let judgeEmail = function (email: string) {
    let strExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    if (!strExp.test(email)) {
        throw new emailInvalidError();
    }
};

export {
    usernameInvalidError,
    passwordInvalidError,
    emailInvalidError,
    judgeUsername,
    judgePassword,
    judgeEmail
}