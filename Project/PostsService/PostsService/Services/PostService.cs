using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using PostsService.ResultTypes;
namespace PostsService.Services
{
    public class PostService : IPostService
    {
        private DbContextOptions<ProjectContext> options;
        public PostService()
        {

        }

        public PostService(DbContextOptions<ProjectContext> options)
        {
            this.options = options;
        }
        public ExecutionOutcome<Post> CreatePost(Post post)
        {
            try
            {
                using (var context = new ProjectContext(options))
                {
                    post.CreatedAt = DateTime.UtcNow;
                    post.UpdatedAt = DateTime.UtcNow;
                    HashAlgorithm sha = SHA256.Create();
                    post.SecretKey = sha.ComputeHash(BitConverter.GetBytes(post.CreatedAt.Ticks)).ToString(); // FIXME
                    context.Add(post);
                    context.SaveChanges();
                    var result = new ExecutionOutcome<Post>()
                    {
                        Message = "Success",
                        Data = post,
                        Code = 200
                    };
                    return result;
                }
            } catch (Exception e)
            {
                var result = new ExecutionOutcome<Post>()
                {
                    Message = "Failure" + e.StackTrace,
                    Data = null,
                    Code = 500
                };
                return result;
            }
        }

        public ExecutionOutcome<List<Post>> GetPosts(int miles, double latitude, double longitude)
        {
            try
            {
                var posts = Util.GetPostsWithinRadius(miles, latitude, longitude);
                Console.WriteLine(posts);
                return new ExecutionOutcome<List<Post>>()
                {
                    Message = "Success",
                    Data = posts,
                    Code = 200
                };
            } catch (Exception e)
            {
                return new ExecutionOutcome<List<Post>>()
                {
                    Message = "Failure " + e.StackTrace,
                    Data = null,
                    Code = 500
                };
            }
        }
    }
}
