import {
  GetItemInput,
  ScanInput,
  PutItemInput,
  DeleteItemInput,
  UpdateItemInput,
} from "aws-sdk/clients/dynamodb";

import { Database } from "../database";

export abstract class BaseRepository<T = any> {
  private _db: Database;
  private _tableName: string;

  constructor(tableName: string) {
    this._db = Database.getInstance();
    this._tableName = tableName;
  }

  async selectAll(Key: any) {
    const params: ScanInput = {
      TableName: this._tableName,
    };
    const result = await this._db.client.scan(params).promise();
    return result.Items || [];
  }

  protected async selectOne(Key: any) {
    const params: GetItemInput = {
      TableName: this._tableName,
      Key: Key,
    };
    const result = await this._db.client.get(params).promise();
    return result.Item;
  }

  protected insert(data: any) {
    const params: PutItemInput = {
      TableName: this._tableName,
      Item: data,
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
    const params: UpdateItemInput = {
      TableName: this._tableName,
      Key,
    };
    return this._db.client.update(params).promise();
  }
}
