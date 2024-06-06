using ListaTarefas.Domain.DomainObjects;
using ListaTarefas.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace ListaTarefas.Api.Controllers
{
    public class MainController : Controller
    {
        private readonly INotificationService _notificationService;

        protected MainController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        protected ActionResult CustomResponse(object result = null)
        {
            if (_notificationService.GetMessages().Any())
                return BadRequest(_notificationService.GetMessages().Select(n => n.Message).ToList());

            if (_notificationService.GetValidationFailures().Any())
                return BadRequest(_notificationService.GetValidationFailures()
                    .Select(n => n.ErrorMessage).ToList());

            return Ok(result);
        }

        protected ActionResult CustomResponse(ModelStateDictionary modelStateDictionary)
        {
            if (modelStateDictionary.ErrorCount > 0)
            {
                foreach (var erro in modelStateDictionary.Values.SelectMany(erro => erro.Errors))
                {
                    _notificationService.Add(new NotificationMessage(
                        erro.Exception == null
                        ? erro.ErrorMessage
                        : erro.Exception.Message
                        )
                    );
                }
            }
            return CustomResponse();
        }
    }
}
