using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.ShareStory
{
    public class ShareStoryUpdateApproval
    {
        [Required]
        public bool IsApproved { get; set; }
        [Required]
        public int Id { get; set; }

    }
}
