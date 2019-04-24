import model from '../models';
const {task} = model;

export async function createtaskfrombody(req, res) {
    return task
        .create({
            tname: req.body.tname,
            tdesc: req.body.tdesc,
            tduedate: req.body.tduedate,
            userid: req.body.userid
        })
        .then(task => res.status(201).send(task))
        .catch(error => res.status(400).send(error));
}

export async function listalltasks(req,res) {
    task.findAll()
    .then(task => {
        if(task == ''){
            res.send("no tasks for this user!!!");
        }else{
            res.send(task);
        }
    })
}

