import { faker } from "@faker-js/faker/locale/en";
import mongoose from "mongoose";
import Product from "./models/product";

const url = process.env.MONGO_URI || `mongodb://0.0.0.0:27017/test`;

export function createRandomProduct() {
  return {
    department: faker.commerce.department(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    photos: [faker.image.url(), faker.image.url(), faker.image.url()],
    createdAt: new Date(),
  };
}

export function generateFakeProducts(count) {
  const fakeProducts = [];
  for (let i = 0; i < count; i++) {
    fakeProducts.push(createRandomProduct());
  }
  return fakeProducts;
}

export async function saveFakeProductsToDatabase(fakeItems) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const item of fakeItems) {
      const newProduct = new Product(item);
      await newProduct.save();
    }

    console.log(`${fakeItems.length} fake products added.`);
  } catch (error) {
    console.error("An error has occurred", error);
  } finally {
    mongoose.disconnect();
  }
}

const fakeProducts = generateFakeProducts(20);
// console.log(fakeProducts);

// saveFakeProductsToDatabase(fakeProducts);
