import { base_url } from "./baseurl";
import { commonAPI } from "./commonAPI";

// register user
export const registerAPI=async(user)=>{
    return await commonAPI("POST",`${base_url}/user/register`,user,"")
}

// login user
export const loginAPI=async(reqbody)=>{
    return await commonAPI("POST",`${base_url}/user/login`,reqbody,"")
}

// add projects
export const addprojectAPI=async(reqbody,reqheader)=>{
    return await commonAPI("POST",`${base_url}/project/add`,reqbody,reqheader)
}

// get projects
export const homeprojectAPI=async()=>{
    return await commonAPI("GET",`${base_url}/project/home-project`,'','')
}

// get all projects
// search key is passed as query parmeter
// syntax: path?key=value
export const allprojectAPI=async(searchkey,reqheader)=>{
    return await commonAPI("GET",`${base_url}/project/all-project?search=${searchkey}`,searchkey,reqheader)
}

export const userprojectAPI=async(reqheader)=>{
    return await commonAPI("GET",`${base_url}/project/user-project`,'',reqheader)
}

//7) update user project
export const editUserProjectAPI = async(id,reqbody, reqheader)=>{
    return await commonAPI("PUT",`${base_url}/project/edit/${id}`,reqbody, reqheader)
}

// 8 delete a project
export const deleteProjectApi = async(id,reqheader)=>{
    return await commonAPI("DELETE",`${base_url}/project/remove/${id}`,{},reqheader)
}

export const addprofileAPI=async(reqbody,reqheader)=>{
    return await commonAPI("POST",`${base_url}/profile/add`,reqbody,reqheader)
}

export const userprofileAPI=async(reqheader)=>{
    return await commonAPI("GET",`${base_url}/profile/user-profile`,'',reqheader)
}

export const updateprofileAPI = async(id,reqbody, reqheader)=>{
    return await commonAPI("PUT",`${base_url}/profile/update-profile/${id}`,reqbody, reqheader)
}

export const removeprofileAPI=async(id,reqheader)=>{
    return await commonAPI("DELETE",`${base_url}/profile/remove-profile/${id}`,{},reqheader)
}