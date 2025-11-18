export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: 'Red';
    type: 'Wavy';
  };
  ip: '56.201.85.9';
  address: {
    address: '576 Fifth Street';
    city: 'Denver';
    state: 'South Dakota';
    stateCode: 'SD';
    postalCode: '57252';
    coordinates: {
      lat: -66.218177;
      lng: -145.340165;
    };
    country: 'United States';
  };
  macAddress: '31:9a:28:8b:99:6c';
  university: 'Ohio State University';
  bank: {
    cardExpire: '12/29';
    cardNumber: '3614993744940956';
    cardType: 'Diners Club International';
    currency: 'USD';
    iban: 'DE65581882748067758114';
  };
  company: {
    department: 'Services';
    name: 'Considine - Torp';
    title: 'Web Developer';
    address: {
      address: '27 Cedar Street';
      city: 'Philadelphia';
      state: 'Connecticut';
      stateCode: 'CT';
      postalCode: '79574';
      coordinates: {
        lat: -81.841588;
        lng: 31.79423;
      };
      country: 'United States';
    };
  };
  ein: '326-604';
  ssn: '933-784-949';
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';
  crypto: {
    coin: 'Bitcoin';
    wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a';
    network: 'Ethereum (ERC20)';
  };
  role: 'moderator';
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country?: string;
  };
  company?: {
    name?: string;
    title?: string;
    department?: string;
  };
}

export interface UpdateUser extends CreateUser {
  id: number;
}
