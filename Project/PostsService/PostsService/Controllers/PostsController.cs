using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PostsService.Models;
using PostsService.Services;
using Models;
using PostsService.ResultTypes;
using System.Collections.Generic;

namespace PostsService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly ServiceFactory serviceFactory;

        public PostsController(ServiceFactory serviceFactory)
        {
            this.serviceFactory = serviceFactory;
        }

        // POST: api/Posts/PostsWithinMiles
        [Route("PostsWithinMiles")]
        [HttpPost()]
        public IActionResult PostsWithinMiles([FromBody] PostRequest postRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(postRequest);
            }
            var result = serviceFactory.GetPostServiceReal().GetPosts(postRequest.Miles, postRequest.Latitude, postRequest.Longitude);
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }

        // POST api/Posts/Create
        [Route("Create")]
        [HttpPost]
        public IActionResult Post([FromBody] Post post)
        {
            var result = serviceFactory.GetPostServiceReal().CreatePost(post);
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }

        // GET api/Posts/GetTrending
        [Route("GetTrending")]
        [HttpGet]
        public IActionResult GetTrending(int? Offset, int? Limit)
        {
            var offsetVal = Offset.HasValue ? Offset.Value : 0;
            var limitVal = Limit.HasValue ? Limit.Value : 5;
            var result = serviceFactory.GetPostServiceReal().GetTrendingPosts(offsetVal, limitVal);
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }
    }
}
