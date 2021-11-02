using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PostsService.Models;
using PostsService.Services;
using Models;

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
            var result = serviceFactory.GetPostService().GetPosts(postRequest.Miles, postRequest.Latitude, postRequest.Longitude);
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }

        // POST api/Posts/Create
        [Route("Create")]
        [HttpPost]
        public IActionResult Post([FromBody] Post post)
        {
            var result = serviceFactory.GetPostService().CreatePost(post);
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }

        // GET api/Posts/GetTrending
        [Route("GetTrending")]
        [HttpGet]
        public IActionResult GetTrending()
        {
            var result = serviceFactory.GetPostService().GetTrendingPosts();
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }
    }
}
