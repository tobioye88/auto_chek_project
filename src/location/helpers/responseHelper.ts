export class ResponseHelper {
  static success(data: any, message = 'Success') {
    return { data, message };
  }

  static error(data: any, message = 'Error') {
    return { data, message };
  }
}
