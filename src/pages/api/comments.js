import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'comments.json');

const getComments = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};

const saveComments = (comments) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(comments, null, 2), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { postId } = req.query;
    try {
      const comments = await getComments();
      const postComments = comments.filter((comment) => comment.postId === parseInt(postId, 10));
      res.status(200).json(postComments);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching comments', error: err });
    }
  }

  if (req.method === 'POST') {
    const { postId, comment } = req.body;
    if (!postId || !comment) {
      return res.status(400).json({ message: "Both postId and comment are required" });
    }

    try {
      let comments = await getComments();
      const newData = {
        id: comments.length + 1,
        postId,
        comment,
      };
      comments.push(newData);
      await saveComments(comments);
      return res.status(200).json({ message: 'Comment added successfully', newData });
    } catch (err) {
      return res.status(500).json({ message: 'Error saving comment', error: err });
    }
  }
}
