import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            minLength:[3,"First Name Must Contains Atleast 3 characters"]
        },
        lastName:{
            type:String,
            required:true,
            minLength:[3,"Last Name Must Have Atleast 3 characters"]
        },
        email:{
            type:String,
            required:true,
            validate:[validator.isEmail,"Please Provide a Valid Email !"]
        },
        phone:{
            type:String,
            required:true,
            minLength:[10, "Phone Number Must Contain MIN 10 digit"],
            maxLength:[13, "Phone Number Must Contain MAX 13 character"]
        },
        nic:{
            type:String,
            required:true,
            minLength:[13, "NIC Must Contain MAX 13 digit"],
            maxLength:[13, "Phone Number Must Contain MAX 13 character"]
        },
        dob:{
            type:String,
            requried:[true, "Date of Birth is Required !"]
        },
        gender:{
            type:String,
            required: [true, "Gender Is Required!"],
            enum:["Male","Female"]
        },
        password:{
            type:String,
            required:true,
            minLength:[8,"Password Must Contain Atleast 8 characters"],
            select:false
        },
        role:{
            type:String,
            required:true,
            enum:["Admin","Patient","Doctor"],
        },
        doctorDepartment:{
            type:String,

        },
        docAvatar:{
            public_id:String,
            url:String,
        }
    }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password =await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES}
    )
};


export const User = mongoose.model("User", userSchema);