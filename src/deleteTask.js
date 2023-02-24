const AWS = require("aws-sdk");


const deleteTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { idTask } = event.pathParameters;

  try {
    await dynamodb
      .delete({
        TableName: process.env.AWS_TABLE_NAME,
        Key: { id: idTask },
      })
      .promise();

    const response = {
      status: 200,
      body: JSON.stringify({ message: "Tarea Eliminada" }),
    };
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

module.exports = { deleteTask };
