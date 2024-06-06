import 'package:intl/intl.dart';

extension DateTimeFormat on DateTime{
  String toDateBr(){
    return DateFormat("dd/MM/yyyy").format(this);
  }
}

extension DateTimeNullFormat on DateTime?{
  String toDateBr(){
    return this == null ? '' : DateFormat("dd/MM/yyyy").format(this!);
  }
}