const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { title, description } = JSON.parse(event.body);
  let currentDate = new Date();
  const createdAt = currentDate.toISOString().split("T")[0];

  const id = v4();

  const newTask = {
    id,
    title,
    description,
    createdAt,
    done: false,
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.AWS_TABLE_NAME,
        Item: newTask,
      })
      .promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Datos guardados correctamente",
        newTask,
      }),
    };
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

module.exports = {
  addTask,
};
