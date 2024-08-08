import Link from "./../model/Link.js";
import User from "../model/User.js";

const postLink = async (req, res) => {
  const { target, slug, title,user } = req.body;

  const link = new Link({
    title,
    target,
    slug,
    user
  });


  const savedLink = await link.save();
  res.json({
    success: true,
    data: savedLink,
    message: "Link created successfully",
  });
};

const getLinks = async (req, res) => {
  const {userId} = req.query;
  
  const user = await User.findById(userId);

  if (!user) {
      return res.json({
          success: false,
          data: null,
          message: "User not found"
      })
  }
  const allLinks = await Link.find({"user" : userId }).sort({ createdAt : -1 })
  res.json({
      success: true,
      data: allLinks,
      message: "All Link fetched successfully"
  })
} 

const getslugRedirect = async (req, res) => {
  const { slug } = req.params;
  const link = await Link.findOne({ slug });

  if (!link) {
    return res.json({
      success: false,
      message: "Link not found",
    });
  }

 


  link.views = link.views + 1;
  await link.save();
  // Redirect to the target if the link exists
  return res.redirect(link.target);
};



export { postLink, getslugRedirect,getLinks };
