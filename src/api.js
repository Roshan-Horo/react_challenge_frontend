export const getChallengeByName = async (challengeName) => {
  const response = await fetch(
    `http://localhost:8080/rc/challenges/challengeName/${challengeName}`
  );
  return await response.json();
};

export const getCommentsByPostId = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return await response.json();
};