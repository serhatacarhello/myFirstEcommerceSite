import { faker } from "@faker-js/faker/locale/fr";
import mongoose from "mongoose";
import User from "./models/user.js";

const url = process.env.MONGO_URI || `mongodb://0.0.0.0:27017/test`;

export function createRandomUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function generateFakeUsers(count) {
  const fakeUsers = [];
  for (let i = 0; i < count; i++) {
    fakeUsers.push(createRandomUser());
  }
  return fakeUsers;
}

export async function saveFakeUsersToDatabase(users) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const user of users) {
      const newUser = new User(user);
      await newUser.save();
    }

    console.log(`${users.length} fake users added.`);
  } catch (error) {
    console.error("An error occurred while saving fake users:", error);
  } finally {
    mongoose.disconnect();
  }
}

const fakeUsers = generateFakeUsers(2);
// console.log(fakeUsers);

// saveFakeUsersToDatabase(fakeUsers);
