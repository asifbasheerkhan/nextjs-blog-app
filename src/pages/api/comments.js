import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'comments.json');

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
        console.log('sof');

        const { postId, comment } = req.body;
        console.log(postId);
        console.log(comment);



        if(!postId || !comment) {
            return res.status(500).json({message: "The comment or postId is not there"});
        }
        let comments = [];



        const data = fs.readFileSync(filePath, 'utf-8');

        if(data.trim() !== '') {
            comments = JSON.parse(data);
        }
        console.log(comments);


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