const AWS = require("aws-sdk");

const updateTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { idTask } = event.pathParameters;

  const { done, title, description } = JSON.parse(event.body);

  try {
    await dynamodb
      .update({
        TableName: process.env.AWS_TABLE_NAME,
        Key: { id: idTask },
        UpdateExpression:
          "set done = :done, title = :title, description = :description",
        ConditionExpression: "done = :noDone",
        ExpressionAttributeValues: {
          ":done": done ? done : false,
          ":description": description,
          ":title": title,
          ":noDone": false,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    const response = {
      status: 200,
      body: JSON.stringify({ message: "Tarea Actualizada" }),
    };
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

module.exports = { updateTask };
