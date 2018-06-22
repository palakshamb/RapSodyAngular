export interface MagnitudeEntity {
  Code: string;
  Label: string;
  Acronym: string;
  CurrencyId: number;
  IsActiveEntity: boolean;
  CodeES: string;
  SBU: string;
  SBULabel: string;
}

export interface MagnitudeEntityViewModel {
  id: number;
  Code: string;
  Label: string;
  Acronym: string;
  Currency: string;
  isActive: boolean;
  // CodeES: string;
  // SBU: string;
  // SBULabel: string;
}

export interface CampignDashboardViewModel {
  Name: string;
  Entity: string;
  ClosingDate: Date;
  LastModifiedDate: Date;
  OpenedBy: string;
  Static: string;
  Dynamic: string;
}

export interface Campaign {
  name: string;
  closingDate: Date;
  static: string;
  dynamic: string;
  lastModifiedDate: Date;
}

export interface SelectList {
  Value: string;
  Text: string;
}

export interface CurrencyViewModel {

}

export interface UserLoginViewModel {
  userName: string;
  password: string;
}

export interface AuthenticationResult {
  expires_in: number;
  access_token: string;
  token_type: string;
}