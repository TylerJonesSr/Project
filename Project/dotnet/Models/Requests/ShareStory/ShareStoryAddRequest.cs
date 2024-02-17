using Sabio.Models.Domain.ShareStory;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.ShareStory
{
    public class ShareStoryAddRequest
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
        public int StoryId { get; set; }
        public int FileId { get; set; }
        public int Id { get; set; }
    }
}

