import { graphqlQuery } from "@/lib/graphqlQuery";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchOnePostApi = createAsyncThunk(
    'fetchOnePostApi/get',
    async (findOnePostWithCommentId: string, thunkApi) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            let query = `query findOnePostWithComment($findOnePostWithCommentId: String!) {
                findOnePostWithComment(id: $findOnePostWithCommentId) {
                  id
                  content
                  fileUrl
                  createdAt
                  updatedAt
                  commentCount
                  likeCount
                  is_Liked
                  comments {
                    content
                    createdAt
                    id
                    user {
                      id
                      email
                      username
                      name
                      profilePicture
                    }
                  }
                  user {
                    id
                    username
                    name
                    profilePicture
                  }
                }
              }
              `
            const res = await graphqlQuery({
                query: query,
                variables: { findOnePostWithCommentId }
            })

            return res.findOnePostWithComment
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const createPostLikeApi = createAsyncThunk(
    'createPostLikeApi/post',
    async (createLikeId: string, thunkApi) => {
        try {
            let query = `mutation CreateLike($createLikeId: String!) {
                createLike(id: $createLikeId) {
                  like
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { createLikeId }
            })

            return {
                postId: createLikeId
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);

export const destroyPostLikeApi = createAsyncThunk(
    'destroyPostLikeApi/post',
    async (destroyLikeId: string, thunkApi) => {
        try {
            let query = `mutation DestroyLike($destroyLikeId: String!) {
                destroyLike(id: $destroyLikeId) {
                  like
                }
              }`
            const res = await graphqlQuery({
                query: query,
                variables: { destroyLikeId }
            })

            return {
                postId: destroyLikeId
            }
        } catch (error: any) {
            return thunkApi.rejectWithValue({
                ...error?.response?.data,
            })
        }
    }
);