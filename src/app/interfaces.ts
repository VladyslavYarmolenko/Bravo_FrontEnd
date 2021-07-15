export interface Email {
  email: string;
}

export interface SuccessEmail {
  status: string;
}

export interface Request {
  email: Email;
  code?: number;
}

