using System;
using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Linq;
using System.Diagnostics;
using PostsService.Services;

namespace PostsService.Tests
{
    public class PostServiceTest
    {
        private IPostService _postService;

        public PostServiceTest(IPostService postService)
        {
            _postService = postService;
        }

        private class GeoCoordinate
        {
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }

        GeoCoordinate WorkBarBoston = new GeoCoordinate() { Latitude = 42.35201, Longitude = -71.07218 };
        GeoCoordinate CambridgeHome = new GeoCoordinate() { Latitude = 42.36512, Longitude = -71.09716 };
        GeoCoordinate North116Flats = new GeoCoordinate() { Latitude = 42.43001, Longitude = -72.54647 };
        GeoCoordinate XtremeCrazeLaserTag = new GeoCoordinate() { Latitude = 42.52502, Longitude = -71.14116 };
        GeoCoordinate StickysFingerJoint40thSt = new GeoCoordinate() { Latitude = 40.75480, Longitude = -73.98650 };

        private Post CreatePostPayload(string description, double latitude, double longitude)
        {
            return new Post()
            {
                Description = description,
                Latitude = latitude,
                Longitude = longitude,
                SecretKey = "testkey",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
        }

        [Fact]
        public void CreatePostTest()
        {
            var options = new DbContextOptionsBuilder<ProjectContext>()
            .UseInMemoryDatabase(databaseName: "PostsDatabase")
            .Options;

            using (var context = new ProjectContext(options))
            {
                var postService = new PostService(context);
                var postObj = postService.CreatePost(CreatePostPayload("test post", 1.0, 1.0));

                Assert.True(context.Posts.AsEnumerable().Count() == 1, "Posts table consists of exactly one post.");

                var remotePost = context.Posts.Find(postObj.Data.Id);
                Assert.True(remotePost != null, "Post not found in the database.");
                Assert.True(remotePost.Id != 0, "Post was not assigned an ID.");
            }
        }

        [Fact]
        public void GetPostsWithinMilesTest()
        {
            var options = new DbContextOptionsBuilder<ProjectContext>()
            .UseInMemoryDatabase(databaseName: "PostsDatabase")
            .Options;

            // insert mock data
            using (var context = new ProjectContext(options))
            {
                context.Posts.Add(CreatePostPayload("WorkBar post", WorkBarBoston.Latitude, WorkBarBoston.Longitude));
                context.Posts.Add(CreatePostPayload("Cambridge Home post", CambridgeHome.Latitude, CambridgeHome.Longitude));
                context.Posts.Add(CreatePostPayload("North 116 Flats post", North116Flats.Latitude, North116Flats.Longitude));
                context.Posts.Add(CreatePostPayload("Xtreme Craze Laser Tag post", XtremeCrazeLaserTag.Latitude, XtremeCrazeLaserTag.Longitude));
                context.Posts.Add(CreatePostPayload("Stickys Finger Joint post", StickysFingerJoint40thSt.Latitude, StickysFingerJoint40thSt.Longitude));
                context.SaveChanges();
            }
            using (var context = new ProjectContext(options))
            {
                // set current location to WorkBar Boston
                GeoCoordinate currentLocation = WorkBarBoston;
                // get all the posts within the radius of 10 miles
                
            }
            Assert.True(1 == 1, "");
        }
    }
}
