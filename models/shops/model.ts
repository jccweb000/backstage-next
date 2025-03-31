import mongoose, { Schema, model } from 'mongoose';

// 定义模型
const ShopSchema = new Schema({
  shopName: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  icon: { type: String, required: false },
  shopCode: { type: String, required: true },
  users: { type: [], required: true, default: [] },
  createTime: { type: Number, required: true },
  phoneNumber: { type: String }
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

// 创建模型
const Shop = mongoose.models.Shop || model('Shop', ShopSchema);

export default Shop;

export interface IShop {
  shopName: string;
  address?: string;
  phoneNumber?: string;
  icon?: any;
  shopCode: string;
  users?: any;
  id: string;
}
