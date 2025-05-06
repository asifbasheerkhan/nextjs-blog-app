import { log } from 'console';
import fs from 'fs';
import path from 'path';

// const filePath = path.join(process.cwd(), 'data', 'comments.json');
const filePath = path.join('data', 'comments.json');
// console.log(filePath);

const getComments = () => {
const commentsData = fs.readFileSync(filePath, 'utf8');
return JSON.parse(commentsData);
};

export default function handler(req, res) {

    if(req.method == 'GET') {
        const {postId} = req.query;
        const comments = getComments();
        const postComments = comments.filter((comment) => comment.postId === parseInt(postId));


        res.status(200).json(postComments);

    }

    if (req.method === 'POST') {
        const { postId, comment } = req.body;

        if(!postId || !comment) {
            return res.status(500).json({message: "The comment or postId is not there"});
        }
        console.log(filePath);
        let comments = [];



        const data = fs.readFileSync(filePath, 'utf-8');

        if(data.trim() !== '') {
            comments = JSON.parse(data);
        }

        const newData = {
            id: comments.length+1,
            postId,
            comment,
        }

        comments.push(newData);
        fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
        return res.status(200).json({ message: 'Comment added successfully', newData });
    }


}