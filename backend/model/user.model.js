import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, {
  methods: {
    comparePassword: async function (password) {
      return await bcrypt.compare(password, this.password);
    }
  }
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    try{
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch(error) {
        next(error)
    }
});

const User = mongoose.model("bizusers", UserSchema);
export default User;