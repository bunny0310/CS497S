using System;
using Microsoft.EntityFrameworkCore;
using PostsService.Services;
using Models;

namespace PostsService
{
    public class ServiceFactory
    {
        public IPostService GetPostService(DbContextOptions<ProjectContext> options = null)
        {
            var mode = Environment.GetEnvironmentVariable("RunMode");
            if (mode == null || mode == SettingsManager.DEVELOPMENT)
            {
                return new PostService();
            }
            else
            {
                try
                {
                    return new PostService();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return null;
                }
            }
        }

        public IPostService GetPostServiceMockDb(DbContextOptions<ProjectContext> options)
        {
            return new PostService(options);    
        }
    }
}
