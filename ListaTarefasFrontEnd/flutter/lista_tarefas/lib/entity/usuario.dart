class Usuario{
  int id;
  String email;
  String password;

  Usuario({required this.id
        , required this.email
        , required this.password});

  Map<String, dynamic> toJson (){
    return {
      "id": 0,
      "email": email,
      "password": password
    };
  }

  factory Usuario.getInstance(){
    return Usuario(
      id: 0, 
      email: '',
      password: ''
    );
  }

}