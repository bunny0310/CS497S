using System;
using Microsoft.EntityFrameworkCore;
using PostsService.Services;

namespace PostsService
{
    public class ServiceFactory
    {
        public IPostService GetPostServiceReal()
        {
            return new PostService();
        }

        public IPostService GetPostServiceMockDb(DbContextOptions<ProjectContext> options)
        {
            return new PostService(options);    
        }
    }
}
