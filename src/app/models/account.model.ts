export interface Account {
    id: string;
    name: string;
    type: 'chequing' | 'savings';
    balance: number;
}

export interface Transaction {
    id: string;
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    date: Date;
}