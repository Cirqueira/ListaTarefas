namespace ListaTarefas.Domain.DTOs
{
    public class UsuarioLoginDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string AcessToken { get; set; }
    }
}
