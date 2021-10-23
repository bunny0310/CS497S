using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Models;
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
                if (post is null)
                {
                    throw new ArgumentNullException(nameof(post));
                }
                using (var context = options != null
                    ? new ProjectContext(options)
                    : new ProjectContext())
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
                var posts = Util.GetPostsWithinRadius(latitude, longitude, miles);
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

        public ExecutionOutcome<List<Post>> GetTrendingPosts()
        {
            try
            {
                using (var context = options != null
                    ? new ProjectContext(options)
                    : new ProjectContext())
                {
                    var dateCurrentMinus7Days = DateTime.UtcNow.AddDays(-7);
                    var list = context.Posts
                        .Where(post => post.CreatedAt > dateCurrentMinus7Days)
                        .Where(post => post.Votes > 10)
                        .ToList();
                    return new ExecutionOutcome<List<Post>>()
                    {
                        Code = 200,
                        Data = list,
                        Message = "Success"
                    };
                }
            }
            catch (Exception e)
            {
                return new ExecutionOutcome<List<Post>>()
                {
                    Code = 500,
                    Data = null,
                    Message = "Failure " + e.StackTrace,
                };
            }
        }
    }
}
