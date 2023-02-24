const AWS = require("aws-sdk");

const getTaskById = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { idTask } = event.pathParameters;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AWS_TABLE_NAME,
        Key: { id: idTask },
      })
      .promise();

    const task = result.Item;

    const response = {
      status: 200,
      body: { task },
    };
    return response;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getTaskById };
