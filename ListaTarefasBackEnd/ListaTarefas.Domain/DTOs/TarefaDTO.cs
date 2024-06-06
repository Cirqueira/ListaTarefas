using System;

namespace ListaTarefas.Domain.DTOs
{
    public class TarefaDTO
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime? DataVencimento { get; set; }
        public bool Completa { get; set; }
    }
}
