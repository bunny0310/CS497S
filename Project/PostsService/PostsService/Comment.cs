using System;
using System.Collections.Generic;

#nullable disable

namespace PostsService
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public string Value { get; set; }
        public string SecretKey { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
