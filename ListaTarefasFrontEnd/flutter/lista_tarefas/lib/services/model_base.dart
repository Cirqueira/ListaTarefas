abstract class ModelBase<T> {
  ModelBase fromJson(Map<String, dynamic> json);
  List<T> fromJsonToList(Iterable list);
}