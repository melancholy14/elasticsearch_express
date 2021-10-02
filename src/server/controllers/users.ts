import * as model from "../models/users";

export async function getUsers(req, res) {
  const query = req.query;

  try {
    const data = await model.getUsers(query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
}

export async function getUser(req, res) {
  const id = req.params.id;

  try {
    const data = await model.getUser(id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
}
