using System;
using System.Collections.Generic;
using CommentsService.ResultTypes;
using Models;

namespace CommentsService.Services
{
    public interface ICommentService
    {
        public ExecutionOutcome<Comment> CreateComment(Comment comment);
    }
}
