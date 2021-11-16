using System;
using System.Collections.Generic;
using CommentsService.ResultTypes;
using Models;

namespace CommentsService.Services
{
    public interface ICommentService
    {
        public ExecutionOutcome<List<Comment>> GetComments(int id);
    }
}
