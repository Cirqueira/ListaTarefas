
class ServiceResult {
  final int? statusCode;
  final Object? result;
  final List<String>? messages;

  ServiceResult({this.statusCode, this.result, this.messages});

  factory ServiceResult.fromErrorJson(bool ok, Map<String, dynamic> json) {
    return ServiceResult(messages: json["Messages"][0]);
  }

  factory ServiceResult.success(int statusCode, Object result) {
    return ServiceResult(statusCode: statusCode, result: result);
  }

  factory ServiceResult.error(int statusCode, List<String> messages) {
    return ServiceResult(statusCode: statusCode, messages: messages);
  }
}
