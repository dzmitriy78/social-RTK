import React from "react";
import classes from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import PostForm, {FormikValues} from "../../form/PostForm";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../../redux/store";
import {addPost, deletePost} from "../../../redux/profile-reducer";

export type PostDataType = {
    id: number
    message: string
    likeCount: number
}

export const MyPosts: React.FC = () => {

    const dispatch = useDispatch<DispatchType>()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const postData = useAppSelector(state => state.profilePage.postData)

    const deleteMyPost = (id: number) => {
        dispatch(deletePost({postId: id}))
    }

    let postElement = postData
        .map((p: PostDataType, i: number) =>
            <Post key={i} id={p.id}
                  message={p.message}
                  deletePost={deleteMyPost}
                  likes={p.likeCount}/>)


    let addMyPost = (values: FormikValues) => {
        dispatch(addPost({text: values.text}))
    }
    return isAuth ? (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostForm callback={addMyPost}/>
                <div className={classes.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    ) : <div></div>;
}
