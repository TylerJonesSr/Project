using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.ShareStory;

namespace Sabio.Models.Requests.ShareStory
{
    public class ShareStoryUpdateRequest : ShareStoryAddRequest
    {
        public string Url { get; set; }
    }
}

