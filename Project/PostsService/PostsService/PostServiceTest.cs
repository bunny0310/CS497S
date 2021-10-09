using System;
using System.Linq;
using Xunit;
using Microsoft.EntityFrameworkCore;

namespace PostsService
{
    public class PostServiceTest
    {
        private readonly ServiceFactory serviceFactory;

        public PostServiceTest()
        {
            this.serviceFactory = new ServiceFactory();
        }

        [Fact]
        public void TestCreatePost()
        {
            var options = new DbContextOptionsBuilder<ProjectContext>()
            .UseInMemoryDatabase(databaseName: "MockDatabase")
            .Options;

            var post = new Post()
            {
                Description = "test post",
                Latitude = 1.3,
                Longitude = 1.5,
                SecretKey = "abc"
            };
            serviceFactory.GetPostServiceMockDb(options).CreatePost(post);

            using (var context = new ProjectContext(options))
            {
                var posts = context.Posts;
                Assert.Equal(1, posts.Count()); 
            }
        }
    }
}
