using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PostsService.Models
{
    public partial class PostRequest: IValidatableObject
    {
        public PostRequest()
        {
        }
        [Required]
        public int Miles { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Miles < 0)
            {
                yield return new ValidationResult("Miles cannot be less than zero.");
            }
        }
    }
}
