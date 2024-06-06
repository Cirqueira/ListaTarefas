using System;

namespace ListaTarefas.Domain.Entities
{
    public class Tarefa : Entity
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public DateTime? DataVencimento { get; set; }        
        public bool Completa { get; set; }

        public void AtualizarTarefa(Tarefa novaTarefa)
        {
            Titulo = novaTarefa.Titulo;
            Descricao = novaTarefa.Descricao;
            DataVencimento = novaTarefa.DataVencimento;           
            Completa = novaTarefa.Completa;
        }
    }
}