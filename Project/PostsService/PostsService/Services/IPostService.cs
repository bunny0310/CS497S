using System;
using System.Collections.Generic;
using PostsService.ResultTypes;
using Models;

namespace PostsService.Services
{
    public interface IPostService
    {
        public ExecutionOutcome<Post> CreatePost(Post post);
        public ExecutionOutcome<List<Post>> GetPosts(int miles, double latitude, double longitude);
        public ExecutionOutcome<List<Post>> GetTrendingPosts();
    }
}
