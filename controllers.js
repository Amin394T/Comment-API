import { Message, User } from "./models.js";


export async function registerUser(req, res) {
  try {
    let { username, password } = req.body;
    username = username.trim();
    const usernameRegex = /^[a-zA-Z0-9\u0600-\u06FF ]+$/;

    if (!usernameRegex.test(username))
      return res.status(400).json({ code: 11, message: "Username must be Alphanumeric!" });
    if (username.length < 3 || username.length > 25)
      return res.status(400).json({ code: 12, message: "Invalid Username Length!" });
    if (password.length < 8 || password.length > 100)
      return res.status(400).json({ code: 13, message: "Invalid Password Length!" });

    await User.create({ username, password });

    res.status(201).json({ code: 19, message: "User Registered." });
  } catch (error) {
    res.status(400).json({ code: 10, message: error.message });
  }
}


export async function readMessages(req, res) {
  try {
    const messages = await Message.findAll({
      where: {
        parent: req.params.id,
        status: "normal"
      }
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ code: 40, message: error.message });
  }
}

export async function createMessage(req, res) {
  try {
    const { username, password, content, parent } = req.body;

    if (!content)
      return res.status(400).json({ code: 34, message: "Comment is Empty!" });
    
    const user = await User.findByPk(username);
    if (!user)
      return res.status(401).json({ code: 31, message: "Invalid Username!" });
    if (user.password != password)
      return res.status(401).json({ code: 32, message: "Invalid Password!" });
    
    const message = await Message.create({ user: username, content, parent });

    res.status(201).json({ code: 39, ...message.dataValues });
  } catch (error) {
    res.status(400).json({ code: 30, message: error.message });
  }
}


export async function deleteMessage(req, res) {
  try {
    const { username, password } = req.body;
    
    const message = await Message.findByPk(req.params.id);
    if (!message)
      return res.status(404).json({ code: 64, message: "Comment not Found!" });

    const user = await User.findByPk(username);
    if (!user || message.user != username)
      return res.status(401).json({ code: 61, message: "Invalid Username!" });
    if (user.password != password)
      return res.status(401).json({ code: 62, message: "Invalid Password!" });
 
    message.status = "removed";
    await message.save();

    res.status(200).json({ code: 69, ...message.dataValues });
  } catch (error) {
    res.status(400).json({ code: 60, message: error.message });
  }
}