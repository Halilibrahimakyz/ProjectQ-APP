export interface Credentials {
  emailOrUsername: string;
  password: string;
}

export interface SignupDataStudent {
  username: string;
  surname: string;
  password: string;
  email: string;
  profilePicture: string;
  idNumber: string;
  phoneNumber?: string;
  gender?: string;
  country?: string;
  city?: string;
  birthDate?: Date;
  bio?: string;
  identificate?: boolean;
  isActive?: boolean;
  userType: 'student';
  interests?: string[];
  school?: string;
  studentClass?: string;
  department?: string;
  gpa?: number;
  verification?: boolean;
  goals?: string;
}

export interface SignupDataSupporter {
  username: string;
  surname: string;
  password: string;
  email: string;
  profilePicture: string;
  idNumber: string;
  phoneNumber?: string;
  gender?: string;
  country?: string;
  city?: string;
  birthDate?: Date;
  bio?: string;
  identificate?: boolean;
  isActive?: boolean;
  userType: 'supporter';
  interests?: string[];
  occupation?: string;
  company?: string;
  behalfCompany?: boolean;
  wantsAnonymous?: boolean;
}

