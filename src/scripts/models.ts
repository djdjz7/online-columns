export interface LoginRequest {
    userName: string;
    password: string;
    clientType: number;
}


export interface LoginResponse {
	clientCode: string;
	accessToken: string;
	rongCloudToken: any;
	expireInSeconds: number;
	userId: number;
	roleType: number;
	mobile: any;
	needChangePwd: boolean;
	refreshToken: string;
	refreshExpireInSeconds: number;
	needSmsVerification: boolean;
}

export interface ValidationError {
	message: string;
	members: string[];
}

export interface Error {
	code: number;
	message: string;
	details: string;
	validationErrors: ValidationError[];
}

export interface CommonResponse {
	result: any;
	targetUrl?: any;
	success: boolean;
	error: Error;
	unAuthorizedRequest: boolean;
	__abp: boolean;
}
