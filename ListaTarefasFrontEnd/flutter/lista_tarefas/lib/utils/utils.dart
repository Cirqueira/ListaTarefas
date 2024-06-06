import 'dart:convert';
import 'dart:js_interop';
import 'package:universal_html/html.dart' as html;

class Utils {
  static String? obterToken() {
    var tokenBase64 = html.window.localStorage['token'];
    return tokenBase64 == null ? null : stringBase64ToString(tokenBase64);
  }

  static String? stringBase64ToString(String decodedString) {
    try {
      return latin1.decode(base64Decode(decodedString));
    } catch (e) {
      return null;
    }
  }

  static String? stringToBase64(String encodedString) {
    try {
      return base64Encode(latin1.encode(encodedString));
    } catch (e) {
      return null;
    }
  }

  static void salvarToken(String token) {
    var token64 = stringToBase64(token);

    if (token64.isNull) return;
    
    salvarLocalStorage('token', token64!);
  }

  static salvarLocalStorage(String key, String value) {
    html.window.localStorage[key] = value;
  }
}
