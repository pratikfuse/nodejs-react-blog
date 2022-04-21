import config from "config";
import AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
/**
 *
 * returns a singleton database instance
 */
export class Database {
  private static _instance: Database;

  client: DocumentClient;

  private constructor() {
    this.client = new AWS.DynamoDB.DocumentClient({
      region: config.get("aws.region"),
      endpoint: "http://localhost:4566",
      credentials: {
        accessKeyId: config.get("aws.accessKey"),
        secretAccessKey: config.get("aws.secretAccessKey"),
      },
    });
  }

  public static getInstance() {
    if (!Database._instance) {
      Database._instance = new Database();
      return Database._instance;
    }
    return Database._instance;
  }
}
