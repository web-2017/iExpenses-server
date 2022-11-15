import Expenses from '../models/expensesModel.js'

export const expensesGetController = async (req, res) => {
    try {
        const expenses = await Expenses.find().sort('-createdAt') // later post come first
        await res.json(expenses)
    } catch (e) {
        console.log(e)
    }
}

export const expensesGetByIdController = async (req, res) => {
    try {
        const expenses = await Expenses.findOne({ _id: req.params.id }).sort('-createdAt') // later post come first
        await res.json(expenses)
    } catch (e) {
        console.log(e)
    }
}

export const expensesCreateController = async (req, res) => {
    console.log('🚀 ~ file: expensesController.js ~ line 13 ~ expensesCreateController ~ req', req.body)
    if (!Object.keys(req.body)) return res.status(422).json({ error: 'Fields are required!' })

    // console.log('user', req.user)

    // remove unused keys
    // req.user.password = undefined
    // req.user.__v = undefined

    try {
        const createExpenses = new Expenses({ ...req.body })

        Expenses.findOneAndUpdate({ _id: req.user.id }).exec((err, post) => {
            if (err) return res.status(422).json({ error: err })
            return post.save().then(() => res.status(200).json({ ...post, total: total + req.body.entity.amount }))
        })
    } catch (e) {
        console.log(e)
    }
}

export const getPostController = async (req, res) => {
    try {
        const post = await Expenses.findOne({ _id: req.params.postId }).populate(
            'postedBy',
            '_id tel firstName coords.address email',
        )
        return res.json(post)
    } catch (e) {
        return res.status(422).json({ error: 'postId is required' })
    }
}

export const updateExpensesController = async (req, res) => {
    console.log('body', req.body)
    try {
        Expenses.findByIdAndUpdate(req.body.id, { ...req.body }, { new: true }).exec((err, post) => {
            if (err) return res.status(422).json({ error: err })
            else return res.status(200).json(post)
        })
    } catch (e) {
        return res.status(422).json({ error: 'id is required' })
    }
}

export const likePostController = async (req, res) => {
    Expenses.findByIdAndUpdate(req.body.postId, { $push: { likes: req.user._id } }, { new: true })
        .populate('postedBy', '_id tel firstName coords.address email')
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                return res.json(result)
            }
        })
}

export const unLikePostController = async (req, res) => {
    Expenses.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.user._id } }, { new: true })
        .populate('postedBy', '_id tel firstName coords.address email')
        .exec((err, result) => {
            if (err) return res.status(422).json({ error: err })
            else return res.json(result)
        })
}

export const commentPostController = async (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id,
    }
    Expenses.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { comments: comment },
        },
        {
            new: true,
        },
    )
        .populate('postedBy', '_id name')
        .populate('comments.postedBy', '_id name')
        .exec((err, result) => {
            if (err) return res.status(422).json({ error: err })
            else return res.status(200).json(result)
        })
}

export const expensesDeleteController = async (req, res) => {
    Expenses.findOne({ _id: req.params.id })
        .populate('postedBy', '_id name')
        .exec((err, post) => {
            if (err || !post) return res.status(422).json({ error: err })

            if (post.postedBy._id.toString() === req.user._id.toString()) {
                console.log('post', post)
                post.remove()
                    .then((result) => {
                        // console.log('result', result)
                        unlink(result.images[0], () => {
                            console.log('Success: ' + result)
                            res.json({ message: 'Removed file success', result })
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
}

export const deleteCommentController = async (req, res) => {
    const comment = { _id: req.params.commentId }
    console.log(1, req.params)

    Expenses.findByIdAndUpdate(req.params.id, { $pull: { comments: comment } }, { new: true })
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name ')
        .exec((err, postComment) => {
            console.log('postComment', postComment)
            console.log('req.user._id', req.user._id)
            if (err || !postComment) return res.status(422).json({ error: err })

            if (postComment.postedBy._id.toString() === req.user._id.toString()) {
                res.json(postComment)
            }
        })
}
