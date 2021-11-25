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
                int shardNumber = (comment.PostId % 3) + 1;
                Console.WriteLine($"Putting the comment into shard number {shardNumber}");

                using (var context = options != null
                    ? new ProjectContext(options, SettingsManager.RUN_MODE, shardNumber)
                    : new ProjectContext(SettingsManager.RUN_MODE, shardNumber)
                    )
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

    }
}
