import { userInfoModel } from "../model/userInfo";
import { Connection } from "../utils/mongo";
import * as judge from "../utils/judge";
import * as passportErrors from "./error/passportError";
import { debug } from "../utils/debug";


class Passport {
    private Connection: any = null;

    constructor () {
        Connection.getInstance()
            .then((connection) => {
                this.Connection = connection;
            })
            .catch((err) => {
                debug(err.message);
                throw err;
            });
    }

    async getConnection () {
        if (this.Connection) {
            await this.Connection;
        } else {
            return null;
        }
        return this.Connection;
    }

    /**
     * login
     * @param username
     * @param password
     */
    login = async function (username: string, password: string) {
        await this.getConnection();

        if (!username || !password) {
            throw new passportErrors.usernameOrPasswordInvalidError();
        }

        try {
            judge.judgeUsername(username);
            judge.judgePassword(password);
        } catch (err) {
            throw new passportErrors.usernameOrPasswordInvalidError();
        }

        let result;
        try {
            result = await userInfoModel.find(
                {
                    "username": username,
                    "password": password
                });
        } catch (err) {
            throw new passportErrors.databaseError();
        }

        if (result.length != 1) {
            throw new passportErrors.usernameOrPasswordIncorrectError();
        }

        return result[0].get('username');
    };

    /**
     * register
     * @param username
     * @param password
     * @param email
     * @param nickname
     */
    register = async function (username: string, password: string,
                               email: string, nickname: string) {
        await this.getConnection();

        if (!username || !password) {
            throw new passportErrors.usernameOrPasswordInvalidError();
        }

        if (!email) {
            throw new passportErrors.emailInvalidError();
        }

        try {
            judge.judgeUsername(username);
            judge.judgePassword(password);
        } catch (err) {
            throw new passportErrors.usernameOrPasswordInvalidError();
        }
        try {
            judge.judgeEmail(email);
        } catch (err) {
            throw new passportErrors.emailInvalidError();
        }

        let result;
        try {
            let userInfoDoc = new userInfoModel({
                username: username,
                password: password,
                email   : email,
                nickname: nickname
            });
            result = await userInfoDoc.save();
        } catch (err) {
            debug(err);
            throw new passportErrors.databaseError();
        }
        debug(result);

        return result.get('username');
    }
}

export { Passport }