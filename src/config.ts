/*
 * Project config
 */

let env = process.env;

let listenaddr   = env.LISTENADDR               || '127.0.0.1';
let listenport   = parseInt(env.LISTENPORT)     || 3000;
let databasehost = env.DATABASE_HOST            || 'localhost';
let databaseport = parseInt(env.DATABASE_PORT)  ||  27017;
let databaseuser = env.DATABASE_USER            || '';
let databasepass = env.DATABASE_PASS            || '';
let databasename = env.DATABASE_NAME            || 'test';
let redishost    = env.REDIS_HOST               || 'localhost';
let redisport    = parseInt(env.REDIS_PORT)     ||  6379;
let sessmaxage   = parseInt(env.SESS_MAXAGE)    ||  86400000;
let passwordsalt = env.PASSWORD_SALT            || 'test';

let sesskey: Array<string> = ['test'];
if ( env.SESS_KEY ) {
    sesskey = [ env.SESS_KEY ]
}

export {
    listenaddr,
    listenport,
    databasehost,
    databaseport,
    databaseuser,
    databasepass,
    databasename,
    redishost,
    redisport,
    sessmaxage,
    sesskey,
    passwordsalt
}