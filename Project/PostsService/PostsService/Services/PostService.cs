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

        public PostService(DbContextOptions<ProjectContext> options) : this()
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
                
                post.CreatedAt = DateTime.UtcNow;
                post.UpdatedAt = DateTime.UtcNow;
                int shardNumber = (int)((post.SecretKey[post.SecretKey.Length - 1] % SettingsManager.NUMBER_SHARDS) + 1);
                Console.WriteLine("abc" + shardNumber); // REMOVE LATER
                using (var context = options != null
                    ? new ProjectContext(options, SettingsManager.RUN_MODE, shardNumber)
                    : new ProjectContext(SettingsManager.RUN_MODE, shardNumber))
                {
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
    }
}
