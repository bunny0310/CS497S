using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Models
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        public string SecretKey { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Votes { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
