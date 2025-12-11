import bcrypt from "bcrypt";
import { prisma } from "../config/database";
import { jwtSign } from "../lib/jwt.sign";

export const authRegisterService = async ({
  fullName,
	username,
	password,
	role
}: {
	fullName: string,
	username: string,
	password: string,
	role: string
}) => {
	try {
			const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const user = await prisma.user.create({
		data: {
			fullName,
			username,
			passwordHash: hashedPassword,
			userRoles: {
				create: { 
					roleId: role,
				}
			}
		},
		select: {
			id: true,
			fullName: true,
			username: true,
			userRoles: {
				select: {
					role: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
		}
	})

	const userFormatter = {
		id: user.id	,
		full_name: user.fullName,
		username: user.username,
		role: user.userRoles[0]?.role
	}

	return userFormatter;
	} catch (err: any) {
		if (err.code == "P2002") {
			throw { message: "Username is already registered", isExpose: true };
		}

		throw { message: "Internal server error", isExpose: true };
	}
}

export const authLoginService = async ({
username, password, role
}: {
	username: string;
	password: string;
	role: string;
}) => {
	const checkUser = await prisma.user.findFirst({
		where: { 
			username, userRoles: {
				some: {
					role: {
						id: role
					}
				}
			} 
		},
		select: {
			id: true,
			fullName: true,
			username: true,
			passwordHash: true,
			userRoles: {
				select: {
					role: {
						select: {
							id: true,
							name: true,
						}
					}
				}
			}
		}
	});

	if (!checkUser) {
		throw { message: "User is not registered or invalid role", isExpose: true };
	}

	const comparePassword = await bcrypt.compare(password, checkUser?.passwordHash);

	if (!comparePassword) {
		throw { message: "Username or password is incorrect", isExpose: true };
	}

	if (!checkUser.userRoles?.length || !checkUser.userRoles?.[0]?.role) {
		throw { message: "User role is not properly configured", isExpose: true };
	}

	const userRole = checkUser.userRoles[0].role;

	const token = await jwtSign({
		user_id: checkUser.id,
		role: userRole,
	}, process.env.JWT_SECRET_KEY!, { algorithm: "HS256" });

	const userFormatter = {
		id: checkUser.id	,
		full_name: checkUser.fullName,
		username: checkUser.username,
		role: checkUser.userRoles[0]?.role,
		token
	}
	
	return userFormatter;
};
