interface Post {
    id: string
    fileUrl: string[]
    commentCount: number
    likeCount: number
    createdAt: Date | string
    comments: Comment[]
    likes: AuthorData[]
    isDummy?: boolean
    content: string;
    title: string;
    updatedAt?: Date;
    is_Liked: boolean;
    user: AuthorData;
    song?: string[];
    tags?: string[]
    locations?: string[];
    country?: string;
    city?: string;
}

interface AuthorData {
    id: string
    username: string
    email: string
    name: string
    profilePicture?: string
    followed_by?: boolean
    following?: boolean
    bio?: string | null;
    website?: string[];
}
enum Role {
    User = 'user',
    Admin = 'admin',
}
type User = {
    id: string;
    username: string;
    name: string;
    email: string;
    password?: string; // Password might not be returned
    profilePicture: string | null;
    bio: string | null;
    website: string[] | any[];
    createdAt?: Date | string | null | unknown;
    updatedAt?: Date | string | null | unknown;
    isVerified?: boolean | false | null;
    isPrivate?: boolean | false | null;

    friendship: {
        followed_by: boolean; // if the user is followed by the following
        following: boolean; // if the user is following the following
    }
    postCount: number;
    followerCount: number;
    followingCount: number;
}

enum FriendshipStatus {
    // 'pending', 'accepted', 'rejected', 'blocked', 'deleted'
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected',
    Blocked = 'blocked',
    Deleted = 'deleted',
}
type Friendship = {
    id?: string;
    followingUsername?: string;
    authorUsername?: string;
    followingUserId?: string;
    authorUserId?: string;
    createdAt?: Date | string | unknown;
    updatedAt?: Date | string | unknown;
    status?: FriendshipStatus | string;
}

interface Message {
    id: string;
    content: string;
    fileUrl: string[];
    authorId: string;
    deleted: boolean;
    seenBy: string[];
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
    user?: AuthorData | null;
}

interface Conversation {
    id: string;
    members: string[];
    authorId: string;
    messages: Message[]
    user?: AuthorData | null
    isGroup: boolean | null;
    lastMessageContent: string | null;
    totalUnreadMessagesCount: number ;
    lastMessageCreatedAt: Date;
    messagesAllRead: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    groupName?: string | null;
    groupImage?: string | null;
    groupDescription?: string | null;

}

interface Comment {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
    user: AuthorData
}

type Assets = {
    id?: string,
    url?: string,
    type?: 'image' | 'video' | 'audio' | "text"
    caption?: string;
}

type findDataInput = {
    username?: string
    id?: string
    offset: number
    limit: number
}

type GraphqlError = {
    message: string
    locations: {
        line: number
        column: number
    }[]
    path: string[]
    extensions: {
        code: string
        originalError: {
            message: string
            statusCode: number
        }
        stacktrace: string[]
    }
}
type code = 0 | 1
interface ApiPayloadData<T> {
    code: code,
    message: string,
    data: T,
}
type Typing = {
    typing: boolean
    authorId: string
    members: string[]
    conversationId: string
    isGroup: boolean
    groupUser?: AuthorData
}
type disPatchResponse<T> = {
    payload: T,
    error: any
}

export type {
    User,
    Message,
    Conversation,
    Post,
    Comment,
    AuthorData,
    Assets,
    Friendship,
    Role,
    FriendshipStatus,
    findDataInput,
    GraphqlError,
    Typing,
    ApiPayloadData,
    disPatchResponse
}