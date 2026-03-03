const {BookModel, UserModel} = require('../models');

exports.getAllUsers = async(req, res) => {
    const users = await UserModel.find();

    if(!users || Object.keys(users).length === 0) {
        return res.status(404).json({
            success: false,
            message: "no user in the DB"
        })
    }

    res.status(200).json({
        success: true,
        data: users
    })
}

exports.getUser = async(req, res) => {
    const {id} = req.params;

    const user = await UserModel.findById(id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: `there is no user of id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })
}

exports.getSubscriptionDetatils = async(req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: `there is no user of id: ${id}`
        })
    }

    const subscriptionDetails = [user.name + " " + user.surname, user.subscriptionType, user.subscriptionDate];

    res.status(200).json({
        success: true,
        message: "here is users subscription detatils: ",
        data: subscriptionDetails
    })
}

exports.createUser = async(req, res) => {
    const {name, surname, email, subscriptionType, subscriptionDate} = req.body;

    if(!name || !surname || !email || !subscriptionType || !subscriptionDate) {
        return res.status(400).json({
            success: false,
            message: "invalid input!"
        })
    }

    // const user = users.find((each) => each.id === id);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists"
        });
    }

    // users.push({id, name, surname, subscriptionType, subscriptionDate});
    const user = {name, surname, email, subscriptionType, subscriptionDate}
    await UserModel.create(user)
    res.status(200).json({
        success: true,
        message: "user created sucessfully!"
    })
}

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found!"
    });
  }

  res.status(200).json({
    success: true,
    data: updatedUser,
    message: "User updated successfully"
  });
};

exports.deleteUser = async(req, res) => {
    const {id} = req.params;
    // const user = users.find(each => each.id === id);
    const user = await UserModel.findById(id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "user not found!"
        })
    }

    const updatedUsers = await UserModel.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        data: updatedUsers,
        message: "user has been deleted sucessfully..."
    })
}