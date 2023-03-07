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
