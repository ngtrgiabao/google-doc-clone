import { User } from "../db/models/user.model";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../db/models/refresh-token.model";
import { mailService } from "./mail.service";

class UserService {
  public findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ where: { email } });
    return user;
  };

  public createUser = async (email: string, password: string) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const vertificationToken = jwt.sign({ email }, "verify_email");
    const user = await User.create({
      email: email,
      password: hashedPassword,
      vertificationToken: vertificationToken,
    });

    console.log(
      `http://localhost:5173/user/verify-email/${user.vertificationToken}`,
    );

    //call method to send verification email
    // await this.sendVertificationEmail(user);
  };

  private sendVertificationEmail = async (user: User) => {
    const mail = {
      from: "yanji.notification@gmail.com",
      to: user.email,
      subject: "Welcome to Google Docs",
      text: `click the following link to verify your email : http://localhost:3000/user/verify-email/${user.vertificationToken}`,
    };

    await mailService.sendMail(mail);
  };

  public sendPasswordResetEmail = async (user: User) => {
    const mail = {
      from: "yanji.notification@gmail.com",
      to: user.email,
      subject: "Reset your password!",
      text: `http://localhost:3000/user/reset-email/${user.passwordResetToken}`,
    };

    await mailService.sendMail(mail);
  };

  public checkPassword = async (
    user: User,
    password: string,
  ): Promise<boolean> => {
    return await compare(password, user.password);
  };

  public getRequestUser = async (
    user: User | RequestUser,
  ): Promise<RequestUser> => {
    if (user instanceof User) {
      const userWithRoles = await User.scope("withRoles").findByPk(user.id);
      const roles = userWithRoles?.userRoles.map(
        (userRole) => userRole.role.name,
      );
      return {
        id: user.id,
        email: user.email,
        roles: roles,
      } as RequestUser;
    } else return user;
  };

  public generateAuthResponse = async (
    user: RequestUser | User,
  ): Promise<TokenPair> => {
    const requestUser = await this.getRequestUser(user);

    const accessToken = jwt.sign(requestUser, "access_token", {
      expiresIn: "24h",
    });

    const refreshToken = jwt.sign(requestUser, "refresh_token", {
      expiresIn: "24h",
    });

    await RefreshToken.destroy({
      where: { userId: requestUser.id },
    });

    await RefreshToken.create({ token: refreshToken, userId: requestUser.id });

    return { accessToken, refreshToken };
  };

  public getIsTokenActive = async (token: string): Promise<boolean> => {
    const refreshToken = await RefreshToken.findOne({
      where: { token },
    });

    return refreshToken != null;
  };

  public logoutUser = async (userId: number) => {
    await RefreshToken.destroy({
      where: {
        userId,
      },
    });
  };

  public findUserById = async (id: number): Promise<User | null> => {
    const user = await User.findByPk(id);
    return user;
  };

  public resetPassword = async (user: User) => {
    const passwordResetToken = jwt.sign(
      { id: user.id, email: user.email },
      "password_reset",
      {
        expiresIn: "24h",
      },
    );

    await user.update({ passwordResetToken });

    //send password reset email method should be called
    await this.sendPasswordResetEmail(user);
  };

  public findUserByPasswordResetToken = async (
    email: string,
    passwordResetToken: string,
  ): Promise<User | null> => {
    const user = await User.findOne({
      where: {
        email,
        passwordResetToken,
      },
    });

    return user;
  };

  public updatePassword = async (user: User, password: string) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    await user.update({
      password: hashedPassword,
    });
  };

  public findUserByVertificationToken = async (
    email: string,
    vertificationToken: string,
  ): Promise<User | null> => {
    const user = await User.findOne({
      where: {
        email,
        vertificationToken,
      },
    });

    return user;
  };

  public updateIsVerified = async (user: User, isVerified: boolean) => {
    await user.update({
      isVerified,
    });
  };
}

const userService = new UserService();

export { userService };
