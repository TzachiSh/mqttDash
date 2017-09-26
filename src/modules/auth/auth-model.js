import mongoose , {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync , compareSync} from 'bcrypt-nodejs'

const AuthSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator(email) {
                const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return emailRegex.test(email);
            },
            message: '{VALUE} is not a valid email',
        },
    },
    password: {
        type: String, 
        required: true, 
        trim:true, 
        validate: {
        validator(password) {
            return password.length >= 6 && password.match(/\d+/g);
        }, 
        message: 'Not a valid password'

    },
},
    username: String,
});

AuthSchema.plugin(uniqueValidator, {
    message: '{VALUE} already taken!'
});

AuthSchema.pre('save', function (next) {
    if(this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
});

AuthSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },

    authenticateUser(password) {
        return compareSync(password, this.password);
    }
};

export default mongoose.model('Auth',AuthSchema);