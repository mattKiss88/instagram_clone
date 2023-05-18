import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const likePost = async (postId: number, userId: number) => {
  try {
    const response = await axios.post(`${API_URL}/post/like`, {
      postId,
      userId,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postComment = async (
  postId: number,
  comment: string,
  commentRepliedToId: number | null
) => {
  try {
    const response = await axios.post(`${API_URL}/comment/${postId}`, {
      comment,
      commentRepliedToId,
    });

    return response.data.comment;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getUserPosts = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/post/${userId}`);
    console.log(response, "eee");
    return response.data.posts;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);

    return response.data.user;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getFriends = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/friends?limit=8`);

    return response.data.followingUsers;
  } catch (error) {
    console.error(error);
    return error;
  }
};
