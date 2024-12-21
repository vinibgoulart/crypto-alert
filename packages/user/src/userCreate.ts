import { UserDocument, UserModel } from "./userModel";

type UserCreateArgs = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type UserCreateSuccess = {
  success: true;
  user: UserDocument;
};

type UserCreateError = {
  success: false;
  error: string;
};

type UserCreateResponse = UserCreateSuccess | UserCreateError;

export const userCreate = async (
  userPayload: UserCreateArgs
): Promise<UserCreateResponse> => {
  const userExistent = await UserModel.findOne({ email: userPayload.email });

  if (userExistent) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const user = await UserModel.create({
    notification: {
      email: false,
      sms: false,
      pushNotification: true,
    },
    ...userPayload,
  });

  return {
    success: true,
    user,
  };
};
