import axios from "axios";
import * as helper from "./serviceHelpers";

const sharedStoryService = {
  endpoint: `${helper.API_HOST_PREFIX}/api/sharestory`,
};

sharedStoryService.selectAll = async (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${sharedStoryService.endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await axios(config);
    return helper.onGlobalSuccess(response);
  } catch (error) {
    return helper.onGlobalError(error);
  }
};

sharedStoryService.insert = async (data) => {
  const config = {
    method: 'POST',
    url: `${sharedStoryService.endpoint}`,
    withCredentials: true,
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data:data,
  };

  return axios(config)
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};

sharedStoryService.update = async (Id, data) => {
  const config = {
    method: "PUT",
    url: `${sharedStoryService.endpoint}/update/${Id}`,
    withCredentials: true,
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config, data)
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);

};

sharedStoryService.delete = async (storyId) => {
  const config = {
    method: "DELETE",
    url: `${sharedStoryService.endpoint}/${storyId}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await axios(config);
    return helper.onGlobalSuccess(response);
  } catch (error) {
    return helper.onGlobalError(error);
  }
};

export default sharedStoryService;


