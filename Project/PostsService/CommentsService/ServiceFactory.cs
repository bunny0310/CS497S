using System;
using CommentsService.Services;
using Microsoft.EntityFrameworkCore;
using Models;

namespace CommentsService
{
    public class ServiceFactory
    {
        public ICommentService GetPostServiceReal()
        {
            return new CommentService();
        }

        public ICommentService GetPostServiceMockDb(DbContextOptions<ProjectContext> options)
        {
            return new CommentService(options);    
        }
    }
}
