var mongoose = require("mongoose"); //Define a schema
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");
var Schema = mongoose.Schema;
let userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: String
        },
        gender: {
            type: String,
            enum: ["male", "female"]
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        location: {
            type: { type: String },
            coordinates: []
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        status: {
            type: Number,
            default: 0 // 0 = Inactive, 1= Active
        },
        image: {
            // default profile picture
            type: String
        },
        photos: {
            // Multiple images
            type: Array,
            default: []
        },
        uid: {
            type: String
        },
        provider: {
            type: String
        },        
        otp: {
            type: String
        },
        forgot_password_otp: {
            type: String
        },
        device_token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.index({ location: "2dsphere" });
mongoosePaginate.paginate.options = {
    limit: 10
};
userSchema.plugin(mongoosePaginate);

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

userSchema.pre("save", function (next) {    
    if (this.isNew) {
        var saltRounds = 10;
        var encPassword = bcrypt.hashSync(this.password, saltRounds);
        this.password = encPassword;
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
