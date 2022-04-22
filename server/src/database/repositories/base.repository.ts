import {
  GetItemInput,
  ScanInput,
  PutItemInput,
  DeleteItemInput,
  UpdateItemInput,
} from "aws-sdk/clients/dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { Database } from "../database";

export abstract class BaseRepository<T> {
  private _db: Database;
  private _tableName: string;

  constructor(tableName: string) {
    this._db = Database.getInstance();
    this._tableName = tableName;
  }

  async selectAll(Key: any, IndexName?: string) {
    const queryKeys = Object.keys(Key);
    const params: ScanInput = {
      TableName: this._tableName,
      ...(IndexName ? { IndexName } : {}),
      ...(queryKeys.length
        ? {
            FilterExpression: queryKeys
              .map((k) => `${k} = :${k}`)
              .join(" AND "),
            ExpressionAttributeValues: queryKeys.reduce(
              (accumulator, key, index) => ({
                ...accumulator,
                [`:${key}`]: Key[key],
              }),
              {}
            ),
          }
        : {}),
    };
    const result = await this._db.client.scan(params).promise();
    return result.Items || [];
  }

  protected async selectOne<T>(Key: any) {
    const params: GetItemInput = {
      TableName: this._tableName,
      Key: Key,
    };
    const result = await this._db.client.get(params).promise();
    return result.Item;
  }

  protected insert(data: T) {
    const params: PutItemInput = {
      TableName: this._tableName,
      Item: data as any,
    };

    return this._db.client.put(params).promise();
  }

  protected delete(Key: any) {
    const params: DeleteItemInput = {
      TableName: this._tableName,
      Key,
    };
    return this._db.client.delete(params).promise();
  }

  protected update(Key: any, data: any) {
    const itemKeys = Object.keys(data);
    const params: UpdateItemInput = {
      TableName: this._tableName,
      Key,
      ReturnValues: "ALL_NEW",
      UpdateExpression: `SET ${Object.keys(data)
        .map((k, index) => `#field${index} = :value${index}`)
        .join(", ")}`,
      ExpressionAttributeNames: itemKeys.reduce(
        (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
        {}
      ),
      ExpressionAttributeValues: itemKeys.reduce(
        (accumulator, k, index) => ({
          ...accumulator,
          [`:value${index}`]: data[k],
        }),
        {}
      ),
    };
    return this._db.client.update(params).promise();
  }
}
