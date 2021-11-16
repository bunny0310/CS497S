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

        public ExecutionOutcome<Comment> CreateComment(Comment comment)
        {
            try
            {
                using (var context = options != null
                    ? new ProjectContext(options)
                    : new ProjectContext())
                {
                    var commentPost = context.Posts
                        .Where(post => post.Id == comment.PostId)
                        .FirstOrDefault();

                    if (commentPost == null)
                    {
                        return new ExecutionOutcome<Comment>()
                        {
                            Code = 404,
                            Data = null,
                            Message = "Comment's post not found"
                        };
                    }

                    comment.Post = commentPost;
                    comment.CreatedAt = DateTime.UtcNow;
                    comment.UpdatedAt = DateTime.UtcNow;
                    context.Comments.Add(comment);
                    context.SaveChanges();

                    comment.Post = null;
                    return new ExecutionOutcome<Comment>()
                    {
                        Code = 200,
                        Data = comment,
                        Message = "Success"
                    };
                }
            }
            catch (Exception e)
            {
                return new ExecutionOutcome<Comment>()
                {
                    Code = 500,
                    Data = null,
                    Message = "Failure " + e.StackTrace,
                };
            }
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
                        .OrderBy(comment => comment.UpdatedAt)
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
