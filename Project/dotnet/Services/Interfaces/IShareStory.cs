using Sabio.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Sabio.Models.Requests.ShareStory;
using Sabio.Models.Domain.ShareStory;


namespace Sabio.Services.Interfaces
{
    public interface IShareStory
    {
        Task<BaseStory> Get(int Id);
        Task<Paged<BaseStory>> GetAll(int pageIndex, int pageSize);
        Task<int> Add(ShareStoryAddRequest model);
        Task Update(ShareStoryUpdateRequest model);
        Task UpdateApproval(ShareStoryUpdateApproval model);
        Task Delete(int Id);
    }
}

