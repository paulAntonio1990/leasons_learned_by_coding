const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_datatbase', 'root', '', {
    dialect : 'mysql',
    define : {
        timestamps : false
    }
})

const app = express();
app.use(bodyParser.json())

sequelize.authenticate()
    .then(() => console.log('db connection started'))
    .catch((err) => console.log(err))

const User = sequelize.import('./user')
const Repo = sequelize.import('./repo')
const Comment = sequelize.import('./comment')

User.hasMany(Repo)
Repo.hasMany(Comment)

// sequelize.sync({force : true})
//     .then(() => console.log('created'))
//     .catch((error) => console.log(error))

app.post('/create', async (req, res, next) => {
    try {
        await sequelize.sync({force : true})
        res.status(201).json({message : 'created'})
    } catch (err) {
        next(err)
    }
})

// user
app.get('/users', async (req, res) => {
    try {
        let users = await User.findAll()
        res.status(200).json(users)
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.post('/users', async (req, res) => {
    try {
        await User.create(req.body)
        res.status(200).json({message: 'User created'})
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id)
        if (user){
            res.status(200).json(user)
        }
        else{
            res.status(404).json({message : 'user not found'})
        }
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id)
        if (user) {
            await user.update(req.body)
            res.status(202).json({message: 'user update accepted!'})
        }
        else {
            res.status(404).json({message: 'user not found!'})
        }

    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id)
        if (user) {
            await user.destroy()
            res.status(202).json({message: 'user deleted!'})
        }
        else {
            res.status(404).json({message: 'user not found!'})
        }

    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

// Repo
app.get('/users/:uid/repos', async (req, res) => {
    try {        
        let user = await User.findByPk(req.params.uid, {
            include: [Repo] 
        })
        if (user){
            res.status(200).json(user.repos)
        }
        else{
            res.status(404).json({message : 'user not found'})
        }
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.post('/users/:uid/repos', async (req, res) => {
    try {
         let user = await User.findByPk(req.params.uid, {
             include: [Repo]
         })
         if (user) {
             let repo = req.body
             repo.userId = user.id
             await Repo.create(repo)
             res.status(201).json({message: 'repo created!'})
         }   
         else {
             res.status(404).json({message: 'user not found!'})
         }
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.get('/users/:uid/repos/:rid', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.uid)
        if (user){
            let repos = await user.getRepos({
                where : {
                    id : req.params.rid
                }
            })
            let repo = repos.shift()
            if (repo){
                res.status(200).json(repo)
            }
            else{
                res.status(404).json({message : 'repo not found'})
            }
        }
        else{
            res.status(404).json({message : 'user not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.put('/users/:uid/repos/:rid', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.uid)
        if(user) {
            let repos = await user.getRepos({where: {id: req.params.rid}})
            let repo = repos.shift()
            if (repo) {
                await repo.update(req.body)
                res.status(202).json({message: 'repo updated'})
            }
            else {
                res.status(404).json({message: 'repo does not exist'})
            }
        }
        else {
            res.status(404).json({message: 'user not found!'})
        }
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.delete('/users/:uid/repos/:rid', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.uid)
        if (user){
            let repos = await user.getRepos({
                where : {
                    id : req.params.rid
                }
            })
            let repo = repos.shift()
            if (repo){
                await repo.destroy()
                res.status(202).json({message : 'repo deleted'})
            }
            else{
                res.status(404).json({message : 'repo not found'})
            }
        }
        else{
            res.status(404).json({message : 'User not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

// Comment
app.get('/users/:uid/repos/:rid/comments', async (req, res) => {        
    try {        
        let user = await User.findByPk(req.params.uid)
        if (user){
            let repos = await user.getRepos({where: {id : req.params.rid}})
            let repo = repos.shift()
            if (repo) {
                let comments = await repo.getComments()
                res.status(200).json(comments)
            }
            else {
                res.status(404).json({message: 'repo not found!'})
            }            
        }
        else{
            res.status(404).json({message : 'user not found'})
        }
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.post('/users/:uid/repos/:rid/comments', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.uid)
        if (user){
            let repos = await user.getRepos({where: {id : req.params.rid}})
            let repo = repos.shift()
            if (repo) {
                let comment = req.body
                comment.repoId = repo.id
                await Comment.create(comment)
                res.status(201).json({message: 'comment created!'})            
            }
            else {
                res.status(404).json({message: 'repo not found!'})
            }            
        }
        else{
            res.status(404).json({message : 'user not found'})
        }
   }
   catch(err) {
       console.warn(err)
       res.status(500).json({message: 'server error!'})
   }

})

app.get('/users/:uid/repos/:rid/comments/:cid', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.uid)
        if (user){
            let repos = await user.getRepos({
                where : {
                    id : req.params.rid
                }
            })
            let repo = repos.shift()
            if (repo){
                let comments = await repo.getComments({
                    where : {
                        id: req.params.cid
                    }
                })
                let comment = comments.shift()
                if (comment) {
                    res.status(200).json(comment)
                }
                else {
                    res.status(404).json({message: 'comment not found'})
                }
                
            }
            else{
                res.status(404).json({message : 'repo not found'})
            }
        }
        else{
            res.status(404).json({message : 'user not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.put('/users/:uid/repos/:rid/comments/:cid', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.uid)
        if(user) {
            let repos = await user.getRepos({where: {id: req.params.rid}})
            let repo = repos.shift()
            if (repo) {
                let comments = await repo.getComments({
                    where : {
                        id: req.params.cid
                    }
                })
                let comment = comments.shift()
                if (comment) {
                    await comment.update(req.body)
                    res.status(202).json({message: 'comment updated'})
                }
                else {
                    res.status(404).json({message: 'comment not found'})
                }
            }
            else {
                res.status(404).json({message: 'repo does not exist'})
            }
        }
        else {
            res.status(404).json({message: 'user not found!'})
        }
    }
    catch(err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.delete('/users/:uid/repos/:rid/comments/:cid', async (req, res) => {
    try {
        let user = await User.findByPk(req.params.uid)
        if (user){
            let repos = await user.getRepos({
                where : {
                    id : req.params.rid
                }
            })
            let repo = repos.shift()
            if (repo){
                let comments = await repo.getComments({
                    where : {
                        id : req.params.cid
                    }
                })
                let comment = comments.shift()
                if (comment) {
                    await comment.destroy()
                    res.status(202).json({message: 'comment deleted'})
                }
                else {
                    res.status(404).json({message: 'commnet not found'})
                }
            }
            else{
                res.status(404).json({message : 'repo not found'})
            }
        }
        else{
            res.status(404).json({message : 'user not found'})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'server error!'})
    }
})

app.listen(8080);