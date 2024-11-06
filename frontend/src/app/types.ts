export type User = {
    _id: string; 
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    location?: string; 
    bio?: string; 
    profilePic?: string; 
    posts: Post[]; 
    following: Follows[] | string[]; 
    followers: Follows[] | string[]; 
    likes: Like[]; 
    comments: Comment[]; 
    conversations: Conversation[]; 
    createdAt: Date; 
    updatedAt: Date; 
};

export type Author  = {
    authorId:string;
    profilePic: string; 
    firstName:string
    lastName:string
    email?:string
    createdAt?: Date | undefined; 
}


export type Follows = {
    _id: string; 
    follower: User; 
    followerId: string; 
    following: User; 
    followingId: string; 
};

export type Post = {
    _id: string; 
    content: string; 
    author: User;
    authorId: string; 
    likes: Like[]; 
    comments: Comment[]; 
    likedByUser: boolean;
    createdAt: Date; 
    updatedAt: Date; 
};

export type Like = {
    _id: string; 
    user: User; 
    userId: string; 
    post: Post; 
    postId: string; 
};

export type Comment = {
    _id: string; 
    content: string; 
    user: User; 
    userId: string; 
    post: Post; 
    postId: string; 
};

export type Conversation = {
    _id: string; 
    participants: User; 
    messages: Message[];  
};

export type Message = {
    _id: string; 
    senderId: User; 
    receiverId: User; 
    message: string; 
    createdAt: Date;  
};