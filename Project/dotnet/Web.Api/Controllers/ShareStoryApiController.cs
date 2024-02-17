using Microsoft.AspNetCore.Mvc;
using Sabio.Services.Interfaces;
using Sabio.Web.Models.Responses;
using Sabio.Services;
using Microsoft.Extensions.Logging;
using Sabio.Web.Controllers;
using System;
using Sabio.Models;
using System.Threading.Tasks;
using Sabio.Models.Requests;
using Microsoft.AspNetCore.Routing.Internal;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens.Configuration;
using Newtonsoft.Json.Linq;
using Stripe;
using SendGrid;
using Sabio.Models.Domain.ShareStory;
using Sabio.Models.Requests.ShareStory;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/sharestory")]
    [ApiController]
    public class ShareStoryApiController : BaseApiController
    {
        private IShareStory _service = null;
        private IAuthenticationService<int> _authService = null;

        public ShareStoryApiController(IShareStory service, ILogger<ShareStoryApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;

        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ItemResponse<BaseStory>>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                BaseStory story = await _service.Get(id);

                if (story == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<BaseStory> { Item = story };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public async Task<ActionResult<ItemResponse<Paged<BaseStory>>>> GetAll(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<BaseStory> pagedCourses = await _service.GetAll(pageIndex, pageSize);
                if (pagedCourses == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseStory>> { Item = pagedCourses };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }
        [HttpPost]
        public async Task<ActionResult<ItemResponse<int>>> Create(ShareStoryAddRequest model)
        {
            int code = 201;
            int id = await _service.Add(model);

            ItemResponse<int> response = new ItemResponse<int>
            {
                Item = id
            };

            return StatusCode(code, response);
        }

        [HttpPut("update/{id:int}")]
        public ActionResult<ItemResponse<int>> Update(ShareStoryUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("approval/{id:int}")]
        public ActionResult<ItemResponse<int>> UpdateApproval(ShareStoryUpdateApproval model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.UpdateApproval(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<SuccessResponse>> Delete(int id)
        {
            try
            {
                await _service.Delete(id);
                SuccessResponse response = new SuccessResponse();
                return Ok(response);
            }
            catch (Exception ex)
            {
                int code = 500;
                BaseResponse response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
                return StatusCode(code, response);
            }
        }
    }
}

