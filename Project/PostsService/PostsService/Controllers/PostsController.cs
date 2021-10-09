using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PostsService.Models;
using PostsService.Services;

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

        // POST api/posts/Create
        [Route("Create")]
        [HttpPost]
        public IActionResult Post([FromBody] Post post)
        {
            var result = serviceFactory.GetPostServiceReal().CreatePost(post);
            return result.Code == 200 ? Ok(result) : StatusCode(500, result);
        }

        // PUT api/posts/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/posts/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
