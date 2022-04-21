// import { Database } from "../database";
import Container, { Service } from "typedi";

/**
 * @param tableName Database table name
 * @returns
 */
export function InjectRepository(tableName: string) {
  return function (object: any, propertyName: string, index: number) {
    const repository = Reflect.getMetadata("design:paramtypes", object)[index];
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => {
        return Container.of(tableName).get(repository);
      },
    });
  };
}
