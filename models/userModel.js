import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    age: {
        type: Number,
        required: true,
    },

    password:{
        type: String,
        required: true,
        minlenght: 6
    }
})

userSchema.statics.signup = async function (firstName, lastName, userName, email, age, password){
    try{
        // Check if all fields are filled
        if(!firstName || !lastName || !userName || !email || !age || !password){
            throw Error ('All fields must be filled');
        }

        // Check if email is valid and not already in use
        const exists = await this.findOne({email});
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }

        if (exists) {
            throw Error('Email already in use')
        }

        //  Check if username is not already in use
        const usernameExists = await this.findOne({userName})

        if (usernameExists){
            throw Error ('Username already in use')
        }

        //  Check if password is strong enough
        if (!validator.isStrongPassword(password)) {
            throw Error('Password is not strong enough, must be atleast 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character')
        }

        // hash and salt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)


        const user = await this.create({firstName, lastName, userName, email: email.toLowerCase(), age, password: hash});
        return user;
    } catch (error){
        console.log(error);    
        throw error;
    }
}



userSchema.statics.login = async function (email, password) {
    try {
        // Check if all fields are filled
        if (!email || !password) {
            throw new Error("All fields must be filled");
        }

        // Find the user by email
        const user = await this.findOne({ email });
        if (!user) {
            throw new Error("Incorrect email");  // Error if user is not found
        }

        // Check if password is correct
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Incorrect password");
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const User = mongoose.model('User', userSchema)

export default User;