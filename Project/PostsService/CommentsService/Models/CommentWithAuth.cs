using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Models;

namespace CommentsService.Models
{
    public class CommentWithAuth : Comment, IValidatableObject
    {
        public string Hash { get; set; }
        public string PublicKey { get; set; }
        public CommentWithAuth() : base()
        {
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Hash.Trim().Equals(""))
            {
                yield return new ValidationResult("Please provide a hash.");
            }
        }
    }
}
