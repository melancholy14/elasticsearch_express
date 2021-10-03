import { Base64 } from "js-base64";

import * as model from "../models/user";

export async function getUserList(params: any) {
  try {
    if (!params) {
      throw new Error("No parameters(s)");
    }

    const data = await model.getUsers({
      query: params.query || {},
      page: params.page || 0,
      limit: params.limit || 100,
    });

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const data = await model.getUser({
      field: "_id",
      value: id,
    });

    if (!data) {
      throw new Error("No data");
    }

    const result = data.values[0];
    delete result.password;

    return result;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getUserByEmail(user: string) {
  try {
    const [email, password] = user.split(":");

    const { results, values } = await model.getUser({
      field: "email",
      value: email,
    });

    if (results !== 1) {
      throw new Error("Given email doesn't exist multiple accounts.");
    }

    if (Base64.encode(password) !== values[0].password) {
      throw new Error("Given password is not correct.");
    }

    const result = {
      id: values[0].id,
      email: values[0].email,
    };

    return result;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
