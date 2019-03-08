import * as Mongoose from 'mongoose';
import { databasehost, databaseport, databaseuser, databasepass, databasename } from '../config';
import { debug } from './debug';


let URL: string;
if (! (databaseuser || databasepass)) {
    URL = `mongodb://${databasehost}:${databaseport}/${databasename}?authSource=admin`;
} else {
    URL = `mongodb://${databaseuser}:${databasepass}@${databasehost}:${databaseport}/${databasename}?authSource=admin`;
}

debug(`Connection URI is ${URL}`);

class Mongo {
    private Connection:any = null;

    constructor () {
        Mongoose.connect(URL, {useNewUrlParser: true})
            .then((connection) => {
                this.Connection = connection;
            })
            .catch((err) => {
                debug(`Error in connecting to database: ${err.message}`);
                throw err;
            });
    }

    async getInstance () {
        if (this.Connection) {
            await this.Connection;
        } else {
            return null;
        }
        return this.Connection;
    }
}

export let Connection = new Mongo();