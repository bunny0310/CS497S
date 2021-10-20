using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using CommentsService.ResultTypes;
using Models;

namespace CommentsService.Services
{
    public class CommentService : ICommentService
    {
        private DbContextOptions<ProjectContext> options;
        public CommentService()
        {

        }

        public CommentService(DbContextOptions<ProjectContext> options)
        {
            this.options = options;
        }
        
        public ExecutionOutcome<List<Comment>> GetComments(int id)
        {
            try
            {
                using (var context = options != null
                    ? new ProjectContext(options)
                    : new ProjectContext())
                {
                    var list = context.Comments
                        .Where(comment => comment.PostId == id)
                        .ToList();

                    return new ExecutionOutcome<List<Comment>>()
                    {
                        Code = 200,
                        Data = list,
                        Message = "Success"
                    };
                }
            }
            catch (Exception e)
            {
                return new ExecutionOutcome<List<Comment>>()
                {
                    Code = 500,
                    Data = null,
                    Message = "Failure " + e.StackTrace,
                };
            }
        }
    }
}
