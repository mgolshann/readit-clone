export interface Post {
    identifier: string
    title: string
    slug: string
    body?: string
    subName: string
    createdAt: string
    updatedAt: string
    sub?: Sub
    // virtual fields
    url: string
    username: string

    voteScore?: number
    commentCount?: number
    userVote?: number
}

export interface User {
    username: string
    email: string
    createdAt: string
    updatedAt: string
}

export enum contextTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    STOP_LOADING = "STOP_LOADING"
}

export interface Sub {
    createdAt: string
    updatedAt: string
    name: string
    title: string
    description: string
    imageUrn: string
    bannerUrn: string
    username: string
    posts: Post[]
    // virtual fields 
    imageUrl: string
    bannerUrl: string
    postCount?: number
}

export interface Comment {
    createdAt: string,
    updatedAt: string,
    identifier: string,
    body: string,
    username: string,
    post?: Post
    // virtual fields
    voteScore: number,
    userVote: number
}