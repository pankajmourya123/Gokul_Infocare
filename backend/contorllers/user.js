import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { data } from "../models/users.js";

export const createUser=catchAsyncError(async(req,res)=>{
   const{ firstName, lastName, phoneNumber, email, address } = req.body;

   if(!firstName || !lastName || !phoneNumber || !email || !address){
    return next(new ErrorHandler("All fields are required", 400))
   }

   const exUser=await data.findOne({email});

   if(exUser){
    return next(new ErrorHandler("Email is already registered", 400));
   }

   const User=new data({
    firstName,
    lastName,
    phoneNumber,
    email,
    address,
   })
   await User.save();
   res.status(201).json({ message: "User created successfully", User });
})


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await data.find({});
    res.status(200).json(users);
  });

  export const getUserById = catchAsyncError(async (req, res, next) => {
    const user = await data.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    res.status(200).json(user);
  });


  export const updateUser = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, phoneNumber, email, address } = req.body;
  
    const user = await data.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.email = email || user.email;
    user.address = address || user.address;
  
    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully", updatedUser });
  });

  export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await data.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    
    await data.deleteOne({ _id: req.params.id });

    res.status(200).json({ 
      success: true, 
      message: "User deleted successfully" 
    });
});
