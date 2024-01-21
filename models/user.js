const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

//this method "toJSON" is called when you call a, indeed, json
//(ie: in auth controller line 22)
UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...user} = this.toObject();
    user.uid = _id;
    return user;
})

module.exports = model('User', UserSchema);