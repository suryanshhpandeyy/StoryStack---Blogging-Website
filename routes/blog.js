const {Router} = require("express");
const path = require("path");
const multer = require("multer");
const{RestrictToLogIn} = require("../middleware/authentication")
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const router = Router();

//Disk Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
},
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null,filename);
    }
});
const upload = multer({ storage: storage });

//Render To Blog Page
router.get("/add-blog", RestrictToLogIn,(req, res) => {
    res.render("addBlog", {
        user: req.user,
    });
});


//Posting Blog
router.post("/add-blog", RestrictToLogIn,upload.single("CoverImage"), async (req, res) => {
    const{Title, Body}=req.body;
    await Blog.create({
        Title,
        Body,
        CoverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    });
    return res.redirect("/");
});


//Posting Comment
router.post("/comment/:blogId", RestrictToLogIn, async(req,res)=>{
    await Comment.create({
        Content: req.body.Content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`);
})

router.get("/:id", RestrictToLogIn, async (req, res) => {

    const blog = await Blog.findById(req.params.id)
        .populate("createdBy");

    const comments = await Comment.find({
        blogId: req.params.id,
    }).populate("createdBy");
    res.render("blog", {
        user: req.user,
        blog,
        comments,
    });
});

module.exports = router;