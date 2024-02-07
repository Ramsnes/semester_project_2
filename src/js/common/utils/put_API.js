// put_API.js
import { fetcher } from "../../fetcher.js";
import { BASE_API_URL } from "../constants.js";

export async function updatePost(postId, postData) {
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}`;

  try {
    const updatedPost = await fetcher(
      apiUrl,
      {
        method: "PUT",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
      true
    );

    return updatedPost;
  } catch (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }
}
