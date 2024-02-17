using Sabio.Data;
using Sabio.Data.Providers;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Sabio.Models;
using System.Threading.Tasks;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain.ShareStory;
using Sabio.Models.Requests.ShareStory;

namespace Sabio.Services
{
    public class ShareStoryService : IShareStory
    {
        IDataProvider _data = null;
        public ShareStoryService(IDataProvider data)
        {
            _data = data;

        }

        public async Task<BaseStory> Get(int id)
        {
            return await Task.Run(() =>
            {
                string procName = "[dbo].[ShareStory_Select_ById]";
                BaseStory story = null;

                _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    story = MapSingleStory(reader);
                });

                return story;
            });
        }

        public async Task<Paged<BaseStory>> GetAll(int pageIndex, int pageSize)
        {
            return await Task.Run(() =>
            {
                Paged<BaseStory> pagedList = null;
                List<BaseStory> List = null;
                int totalCount = 0;

                _data.ExecuteCmd("dbo.ShareStory_SelectAll", (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                }, (reader, recordSetIndex) =>
                {
                    BaseStory story = MapSingleStory(reader);
                    totalCount = reader.GetSafeInt32(recordSetIndex);

                    if (List == null)
                    {
                        List = new List<BaseStory>();
                    }

                    List.Add(story);
                });

                if (List != null)
                {
                    pagedList = new Paged<BaseStory>(List, pageIndex, pageSize, totalCount);
                }

                return pagedList;
            });
        }

        static BaseStory MapSingleStory(IDataReader reader)
        {
            BaseStory aStory = new BaseStory();

            int startingIndex = 0;

            aStory.Id = reader.GetSafeInt32(startingIndex++);
            aStory.Name = reader.GetSafeString(startingIndex++);
            aStory.Email = reader.GetSafeString(startingIndex++);
            aStory.Story = reader.GetSafeString(startingIndex++);
            aStory.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aStory.IsApproved = reader.GetSafeBool(startingIndex++);
            aStory.ApprovedBy = reader.GetSafeInt32(startingIndex++);
            aStory.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aStory.DateModified = reader.GetSafeDateTime(startingIndex++);
            aStory.StoryId = reader.GetSafeInt32(startingIndex++);
            aStory.FileId = reader.GetSafeInt32(startingIndex++);
            aStory.Url = reader.GetSafeString(startingIndex++);
            return aStory;
        }

        static void AddCommonParams(ShareStoryAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@Story", model.Story);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
            col.AddWithValue("@IsApproved", model.IsApproved);
            col.AddWithValue("@ApprovedBy", model.ApprovedBy);
        }

        public async Task<int> Add(ShareStoryAddRequest model)
        {
            return await Task.Run(() =>
            {
                int Id = 1;
                int storyId = 1;

                string procName = "[dbo].[ShareStory_Insert]";
                _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    col.AddWithValue("@FileId", model.FileId);

                    SqlParameter storyIdOut = new SqlParameter("@StoryId", SqlDbType.Int);
                    storyIdOut.Direction = ParameterDirection.Output;

                    col.Add(storyIdOut);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returncollection)
                {
                    object oStoryId = returncollection["@StoryId"].Value;
                    int.TryParse(oStoryId.ToString(), out storyId);

                    model.StoryId = storyId;

                    object oId = returncollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out Id);
                });

                return Id;
            });
        }
        public async Task Update(ShareStoryUpdateRequest model)
        {
            await Task.Run(() =>
            {
                string procName = "[dbo].[ShareStory_Update]";
                _data.ExecuteNonQuery(procName,
                    inputParamMapper: delegate (SqlParameterCollection col)
                    {
                        AddCommonParams(model, col);

                        col.AddWithValue("@StoryId", model.StoryId);
                        col.AddWithValue("@FileId", model.FileId);
                        col.AddWithValue("@Url", model.Url);
                        col.AddWithValue("@Id", model.Id);
                    },
                    returnParameters: null);
            });
        }

        public async Task UpdateApproval(ShareStoryUpdateApproval model)
        {
            await Task.Run(() =>
            {
                string procName = "[dbo].[ShareStory_Update_Approval]";
                _data.ExecuteNonQuery(procName,
                    inputParamMapper: delegate (SqlParameterCollection col)
                    {
                        col.AddWithValue("@IsApproved", model.IsApproved);
                        col.AddWithValue("@Id", model.Id);
                    },
                    returnParameters: null);
            });
        }


        public async Task Delete(int Id)
        {
            await Task.Run(() =>
            {
                string procName = "[dbo].[ShareStory_Delete_ById]";

                BaseStory shareStory = new BaseStory();
                _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", Id);
                },
                returnParameters: null);
            });
        }

    }
}

