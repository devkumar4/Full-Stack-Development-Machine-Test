import jwt from "jsonwebtoken";

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign(
    { userId: user._id, firstName: user.firstName },
    process.env.JWT_SECRET || "Gssjsslsls&*(!*(@)@)@)@(@*@()",
    { expiresIn: "20d" }
  );

  return { accessToken };
};
