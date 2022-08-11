import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document {
    email:string;
    name:string;
    password:string;
    createdAt:Date;
    updatedAt: Date;
    comparePassword(candidatePassword:string):Promise<boolean>
}
const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique: true},
    name: {type:String, required: true},
    password: {type:String, required: true}
},
{timestamps:true})

userSchema.pre('save', async function(next){
    console.log('PREEEEEEEEEEE')
    let user = this as UserDocument

    if(!user.isModified('password')){
        console.log('PREEEEEEEEEEEnext')
        return next()
    }
    console.log('PREEEEEEEEEEE2')
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))

    const hash = await bcrypt.hashSync(user.password, salt)
    console.log(hash)
    user.password = hash

    return next()
})

//comapare password with hash
userSchema.methods.comparePassword = async function (candidatePassword:string):Promise<boolean>
{
    const user = this as UserDocument
    console.log(candidatePassword)
    console.log(user.password)

    return bcrypt.compare(candidatePassword, user.password).catch(e=>false)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel