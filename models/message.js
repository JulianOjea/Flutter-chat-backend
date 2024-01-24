const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
    from:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {
    timestamps: true //esto coge las fechas generadas por mongo
});

//this method "toJSON" is called when you call a, indeed, json
//(ie: in auth controller line 22)
MessageSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    return object;
})

module.exports = model('Message', MessageSchema);