import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthorData, FeedPost, User } from '@/types'
import { createFriendshipApi, destroyFriendshipApi, fetchUserProfileDetailApi, fetchUserProfileFollowerUserApi, fetchUserProfileFollowingUserApi, fetchUserProfilePostsApi } from '@/redux/services/profile'

// Define a type for the slice state
interface ProfileState {
    state: User | null
    loading: boolean
    error: string | null

    posts: FeedPost[]
    postLoading: boolean
    postError: string | null

    friendShipLoading: boolean
    friendShipError: string | null

    followerList: AuthorData[]
    followerListLoading: boolean
    followerListError: string | null

    followingList: AuthorData[]
    followingListLoading: boolean
    followingListError: string | null
}

// Define the initial state using that type
const profileState: ProfileState = {
    state: null,
    loading: false,
    error: null,

    posts: [],
    postLoading: false,
    postError: null,

    friendShipLoading: false,
    friendShipError: null,

    followerList: [],
    followerListLoading: false,
    followerListError: null,

    followingList: [],
    followingListLoading: false,
    followingListError: null,
}

export const profileSlice = createSlice({
    name: 'Profile',
    initialState: profileState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // find user profile
            .addCase(fetchUserProfileDetailApi.pending, (state) => {
                state.loading = true
                state.error = null
                state.state = null
            })
            .addCase(fetchUserProfileDetailApi.fulfilled, (state, action: PayloadAction<User>) => {
                state.state = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchUserProfileDetailApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
                state.state = null
            })
            // find user profile posts
            .addCase(fetchUserProfilePostsApi.pending, (state) => {
                state.postLoading = true
                state.postError = null
            })
            .addCase(fetchUserProfilePostsApi.fulfilled, (state, action: PayloadAction<FeedPost[]>) => {
                state.posts = action.payload
                state.postLoading = false
            })
            .addCase(fetchUserProfilePostsApi.rejected, (state, action) => {
                state.postLoading = false
                state.postError = action.error.message || null
            })
            // find user profile following list
            .addCase(fetchUserProfileFollowingUserApi.pending, (state) => {
                state.followingListLoading = true
                state.followingListError = null
            })
            .addCase(fetchUserProfileFollowingUserApi.fulfilled, (state, action: PayloadAction<AuthorData[]>) => {
                state.followingList = action.payload
                state.followingListLoading = false
            })
            .addCase(fetchUserProfileFollowingUserApi.rejected, (state, action) => {
                state.followingListLoading = false
                state.followingListError = action.error.message || null
            })
            // find user profile follower list
            .addCase(fetchUserProfileFollowerUserApi.pending, (state) => {
                state.followerListLoading = true
                state.followerListError = null
            })
            .addCase(fetchUserProfileFollowerUserApi.fulfilled, (state, action: PayloadAction<AuthorData[]>) => {
                state.followerList = action.payload
                state.followerListLoading = false
            })
            .addCase(fetchUserProfileFollowerUserApi.rejected, (state, action) => {
                state.followerListLoading = false
                state.followerListError = action.error.message || null
            })
            //  createFriendshipApi
            .addCase(createFriendshipApi.pending, (state) => {
                state.friendShipLoading = true
                state.friendShipError = null
            })
            .addCase(createFriendshipApi.fulfilled, (state, action: PayloadAction<{ userId: string }>) => {
                if (state.state) {
                    state.state.friendship = {
                        ...state.state.friendship,
                        following: true,
                    }
                    if (state.state.id !== action.payload.userId) {
                        state.state.followerCount += 1
                    }
                }
                state.friendShipLoading = false
            })
            .addCase(createFriendshipApi.rejected, (state, action) => {
                state.friendShipLoading = false
                state.friendShipError = action.error.message || null
            })
            // destroyFriendshipApi
            .addCase(destroyFriendshipApi.pending, (state) => {
                state.friendShipLoading = true
                state.friendShipError = null
            })
            .addCase(destroyFriendshipApi.fulfilled, (state, action: PayloadAction<{ userId: string }>) => {
                if (state.state) {
                    state.state.friendship = {
                        ...state.state.friendship,
                        following: false,
                    }
                    if (state.state.id !== action.payload.userId) {
                        state.state.followerCount -= 1
                    }
                }
                state.friendShipLoading = false
            })
            .addCase(destroyFriendshipApi.rejected, (state, action) => {
                state.friendShipLoading = false
                state.friendShipError = action.error.message || null
            })
    },
})

export const {
    // increment,
    // decrement,
    // incrementByAmount,
} = profileSlice.actions

export default profileSlice.reducer