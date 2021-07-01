const express = require("express");
const router = express.Router();

const Post = require("../schemas/post");

// 전체 게시글 조회
router.get("/posting", async (req, res, next) => {
    try {
        const { category } = req.query;
        const post = await Post.find({ category }).sort("-date"); // - 붙이면 내림차순 그냥은 오름차순
        res.json({ posts: posts });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시글 상세 조회
router.get("/posting/:postId", async (req, res) => {
    const { postId } = req.params;
    goods = await Post.findOne({ postId: postId });
    res.json({ detail: posting });
});

// 게시글 작성
router.post('/posting', async (req, res) => {
    const { postId, title, content, author, password } = req.body;

    isExist = await Post.find({ postId });
    if (isExist.length == 0) {
        await Post.create({ postId, title, content, author, password });
    }
    res.send({ result: "success" });
});

// router.post("/goods/:goodsId/cart", async (req, res) => {
//     const { goodsId } = req.params;
//     const { quantity } = req.body;

//     isCart = await Cart.find({ goodsId });
//     console.log(isCart, quantity);
//     if (isCart.length) {
//         await Cart.updateOne({ goodsId }, { $set: { quantity } });
//     } else {
//         await Cart.create({ goodsId: goodsId, quantity: quantity });
//     }
//     res.send({ result: "success" });
// });

// 게시글 삭제
router.delete("/edit/:postId", async (req, res) => {
    const { postId } = req.params;

    const isPostInEdit = await Edit.find({ postId });
    if (isPostInEdit.length > 0) {
        await Post.deleteOne({ postId });
    }

    res.send({ result: "success" });
});

// 게시글 수정
router.patch("/edit/:postId", async (req, res) => {
    const { postId } = req.params;
    const { title, content, author, date, password }  = req.body;

    const isPostInEdit = await Edit.find({ postId});
    if (isPostInEdit.length > 0) {
        await Post.updateOne({ postId }, { $set: { postId, title, content, author, date, password }})
    }})

//     res.send({ result: "success"});
// })

// router.get("/cart", async (req, res) => { // 쓰레기
//     const cart = await Cart.find({});
//     const goodsId = cart.map(cart => cart.goodsId);

//     goodsInCart = await Goods.find()
//         .where("goodsId")
//         .in(goodsId);

//     concatCart = cart.map(c => {
//         for (let i = 0; i < goodsInCart.length; i++) {
//             if (goodsInCart[i].goodsId == c.goodsId) {
//                 return { quantity: c.quantity, goods: goodsInCart[i] };
//             }
//         }
//     });

//     res.json({
//         cart: concatCart
//     });
// });

module.exports = router;