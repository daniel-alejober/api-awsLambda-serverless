const AWS = require("aws-sdk");

const getAllTasks = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    const result = await dynamodb
      .scan({
        TableName: process.env.AWS_TABLE_NAME,
      })
      .promise();

    const tasks = result.Items;
    console.log(tasks);

    const response = {
      status: 200,
      body: { tasks },
    };
    return response;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllTasks };
