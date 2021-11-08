﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CommentsService.Services;
using CommentsService.Models;
using Models.Auth;
using System.Threading.Tasks;
using CommentsService.ResultTypes;
using Models;

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

        // POST api/Comments/Create
        [HttpPost()]
        [Route("Create")]
        public async Task<IActionResult> CreateAsync([FromBody] CommentWithAuth comment)
        {
            var authenticated = await AuthService.IsAuthenticatedAsync(comment.Hash, comment.PublicKey);
            Console.WriteLine(authenticated);
            if (!authenticated)
            {
                var result = new ExecutionOutcome<Comment>()
                {
                    Code = 401,
                    Data = null,
                    Message = "Authentication failure"
                };
                return StatusCode(result.Code, result);
            }
            return Ok(null);
        }
    }
}
