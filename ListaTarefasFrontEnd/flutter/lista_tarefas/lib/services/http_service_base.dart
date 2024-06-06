import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart';
import 'package:http/http.dart' as http;
import '../utils/utils.dart';

class HttpServiceBase {
  late String _baseUrl;

  HttpServiceBase(String controller) {
    _baseUrl = "https://localhost:5001/api/$controller";
  }

  Future<Response> get(String endpoint, {bool authorization = true}) async {
    try {
      return await http.get(Uri.parse("$_baseUrl$endpoint"), headers: await _getHeaders(authorization),);
    } catch (e) {
      return _errorServer();
    }
  }

  Future<Response> post(String endpoint,
      {Object? body, bool authorization = true}) async {
    try {    
      return await http.post(
        Uri.parse("$_baseUrl$endpoint"),
        body: body == null
            ? null
            : utf8.encode(
                jsonEncode(body),
              ),headers: await _getHeaders(authorization),
      );
    } catch (e) {
      return _errorServer();
    }
  }

  Future<Response> put(String endpoint,
      {Object? body, bool authorization = true}) async {
    try {
      return await http.put(
        Uri.parse("$_baseUrl$endpoint"),
        body: body == null
            ? null
            : utf8.encode(
                jsonEncode(body),
              ),headers: await _getHeaders(authorization),
      );
    } catch (e) {
      return _errorServer();
    }
  }

  Future<Response> delete(String endpoint,
      {Object? body, bool authorization = true}) async {
    try {
      return await http.delete(
        Uri.parse("$_baseUrl$endpoint"),
        body: body == null
            ? null
            : utf8.encode(
                jsonEncode(body),
              ),headers: await _getHeaders(authorization),
      );
    } catch (e) {
      return _errorServer();
    }
  }

  Future<Map<String, String>> _getHeaders(bool authorization) async {
    return {
      "content-type": "application/json",
      "version": "1",      
      if (authorization) 'Authorization': "Bearer ${Utils.obterToken()}",      
    };
  }

  Response _errorServer() {
    return Response(jsonEncode(["Erro ao processar requisição"]),
        HttpStatus.internalServerError);
  }
}
