using System;
using CommentsService.Services;
using Microsoft.EntityFrameworkCore;
using Models;

namespace CommentsService
{
    public class ServiceFactory
    {
        public ICommentService GetCommentServiceReal()
        {
            return new CommentService();
        }

        public ICommentService GetCommentServiceRealMockDb(DbContextOptions<ProjectContext> options)
        {
            return new CommentService(options);    
        }
    }
}
