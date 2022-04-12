import 'reflect-metadata';


export function Controller(routePrefix: String = ""): ClassDecorator {
  return function (target) {
    if (routePrefix[0] && routePrefix[0] === '/') routePrefix = routePrefix.slice(1);
    Reflect.defineMetadata("routePrefix", routePrefix, target);
  }
}


export function Get(route: string = ""): MethodDecorator {
  if (route[0] && route[0] === '/') route = route.slice(1);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("path", route, descriptor.value);
    Reflect.defineMetadata("method", "get", descriptor.value);
    return descriptor;
  }
}


export function Post(route: string = ""): MethodDecorator {
  if (route[0] && route[0] === '/') route = route.slice(1);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("path", route, descriptor.value);
    Reflect.defineMetadata("method", "post", descriptor.value);
    return descriptor;
  }
}

export function Put(route: string = ""): MethodDecorator {
  if (route[0] && route[0] === '/') route = route.slice(1);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("path", route, descriptor.value);
    Reflect.defineMetadata("method", "put", descriptor.value);
    return descriptor;
  }
}

export function Delete(route: string = ""): MethodDecorator {
  if (route[0] && route[0] === '/') route = route.slice(1);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("path", route, descriptor.value);
    Reflect.defineMetadata("method", "delete", descriptor.value);
    return descriptor;
  }
}

export function Body(): ParameterDecorator {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata("body", parameterIndex, target[propertyKey]);
    return target[propertyKey];
  }
}

export function Query(): ParameterDecorator {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {

    Reflect.defineMetadata("query", parameterIndex, target[propertyKey]);
    return target[propertyKey];
  }
}

export function Params(): ParameterDecorator {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata("params", parameterIndex, target[propertyKey]);
    return target[propertyKey];
  }
}