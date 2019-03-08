import * as Mongoose from 'mongoose';


let userInfoSchema = new Mongoose.Schema({
    username: String,
    token   : String,
    avatar  : String,
    role    : String
});

let userInfoModel = Mongoose.model('userInfo', userInfoSchema);

export { userInfoModel }
