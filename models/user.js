const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        unique: false,
        required: [true, "username is required"],
    },
    password: {
        type: String,
        unique: false,
        // validate: {
        //     validator: function (v) {
        //         return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
        //     },
        //     message: (props) => `${props.value} is not a valid password`,
        // },
        required: [true, "password is required"],
    },
    email: {
        type: String,
        required: true,
        // validate: {
        //     validator: function (v) {
        //         return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
        //     },
        //     message: (props) => `${props.value} is not a valid email`,
        // },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    goals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Goal",
        },
    ],
});

usersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usersSchema.methods.validPassword = function (password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
};


// Define schema methods
// usersSchema.methods = {
//     checkPassword: function (inputPassword) {
//         return bcrypt.compareSync(inputPassword, this.password);
//     },
//     hashPassword: plainTextPassword => {
//         return bcrypt.hashSync(plainTextPassword, 10);
//     }
// };

const User = mongoose.model("User", usersSchema);

module.exports = User;

