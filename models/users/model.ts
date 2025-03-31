import bcrypt from 'bcryptjs';
import mongoose, { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  account: { type: String, required: true },
  password: { type: String, required: true, default: '123456', select: false },
  name: { type: String },
  role: { type: [String], required: true, default: ['admin'] }
}, {
  toJSON: {
    virtuals: true, // 包含虚拟字段
    transform: (doc, ret) => {
      ret.id = ret._id; // 将 _id 映射为 id
      delete ret._id;   // 删除 _id
      delete ret.__v;   // 删除版本字段
      return ret;
    }
  },
  toObject: {
    virtuals: true,    // 对 toObject 也生效
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// 密码加密中间件
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// 密码校验方法
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || model('User', UserSchema);