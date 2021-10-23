using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CommentsService.Services;

namespace CommentsService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ServiceFactory serviceFactory;

        public CommentsController(ServiceFactory serviceFactory)
        {
            this.serviceFactory = serviceFactory;
        }

        // GET api/Comments/Comments/{Post Id}
        [Route("Comments/{id}")]
        [HttpGet("id")]
        public IActionResult GetComments(int id)
        {
            var result = serviceFactory.GetPostServiceReal().GetComments(id);
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }
    }
}
