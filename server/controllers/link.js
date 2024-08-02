import Link from "./../model/Link.js";

const postLink = async (req, res) => {
  const { target, slug, title } = req.body;

  const link = new Link({
    title,
    target,
    slug,
  });

  const savedLink = await link.save();
  res.json({
    success: true,
    data: savedLink,
    message: "Link created successfully",
  });
};

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

export { postLink, getslugRedirect };
