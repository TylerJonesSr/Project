using System;
using System.ComponentModel.DataAnnotations;


namespace Sabio.Models.Domain.ShareStory
{
    public class BaseStory
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Story { get; set; }
        public int CreatedBy { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
        public string Url { get; set; }
        public int StoryId { get; set; }
        public int FileId { get; set; }
        public int Id { get; set; }
    }
}

