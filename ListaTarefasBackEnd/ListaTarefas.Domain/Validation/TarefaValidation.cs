using FluentValidation;
using ListaTarefas.Domain.Entities;
using System;

namespace ListaTarefas.Domain.Validation
{
    internal class TarefaValidation : AbstractValidator<Tarefa>
    {
        public TarefaValidation(bool validardatavencimento = true) {
            RuleFor(t => t.Titulo)
                .NotNull().WithMessage("O título precisa ser informado.")
                .NotEmpty().WithMessage("O título precisa ser informado.")
                .MaximumLength(30).WithMessage("O título não pode ter mais de 30 caracteres.");

            RuleFor(t => t.Descricao)
                .NotNull().WithMessage("A descrição precisa ser informada.")
                .NotEmpty().WithMessage("A descrição precisa ser informada.")
                .MaximumLength(100).WithMessage("A descrição não pode ter mais de 100 carcteres.");
            
            if (validardatavencimento)                
                RuleFor(t => t.DataVencimento)
                    .Must(t => t >= DateTime.Now.Date).WithMessage("A data de vencimento não pode ser menor que a data atual.");
        
        }
    }
}