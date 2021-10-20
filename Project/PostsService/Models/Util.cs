using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PostsService
{
    public static class Util
    {
        public static string GenerateDatabaseConnectionString()
        {
            var host = Environment.GetEnvironmentVariable("MYSQL_HOST");
            var username = Environment.GetEnvironmentVariable("MYSQL_USER");
            var password = Environment.GetEnvironmentVariable("MYSQL_ROOT_PASSWORD");
            var db = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
            return $"Server={host};User={username};Password={password};Database={db};";
        }
        public static List<Post> GetPostsWithinRadius(
            double currentLatitude,
            double currentLongitude,
            int miles,
            DbContextOptions<ProjectContext> options = null
            )
        {
            using (var context = options != null
                ? new ProjectContext(options)
                : new ProjectContext())
            {
                return context.Posts
                    .Where(post =>
                        (Math.Acos((Math.Sin(Math.PI * post.Latitude / 180)
                        * Math.Sin(Math.PI * currentLatitude / 180))
                        + (Math.Cos(Math.PI * post.Latitude / 180)
                        * Math.Cos(Math.PI * currentLatitude / 180)
                        * Math.Cos(Math.PI * (post.Longitude - currentLongitude) / 180))) * 180 / Math.PI * 60 * 1.1515) < miles)
                    .ToList();
            }
        }
    }
} 
