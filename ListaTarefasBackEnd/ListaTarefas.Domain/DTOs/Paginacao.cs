namespace ListaTarefas.Domain.DTOs
{
    public class Paginacao<T> where T : class
    {
        public int NumeroPagina { get; set; }
        public int TamanhoPagina { get; set; }
        public int TotalRegistros { get; set; }
        public int TotalPaginas { get; set; }
        public T Dados { get; set; }
    }
}
