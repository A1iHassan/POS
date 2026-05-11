export interface BaseEntity {
    id: string;
}

export interface InventoryItem extends BaseEntity {
    sku: string;
    name: string;
    variant?: string;
    category: 'ACCESSORIES' | 'ELECTRONICS' | 'LIFESTYLE' | 'GAMING';
    unitPrice: number;
    stockLevel: number;
    stockStatus: 'IN STOCK' | 'LOW STOCK' | 'SOLD OUT';
    lastSync?: string;
    threshold?: number;
}

export type PaymentMethod = 'CASH' | 'CREDIT CARD' | 'MOBILE PAY' | 'STORE CREDIT' | 'NFC / DIGITAL';

export interface Transaction extends BaseEntity {
    timestamp: string;
    orderRef: string;
    customerName: string;
    terminalId: string;
    items: Array<{
        inventoryId: string;
        quantity: number;
        unitPrice: number;
    }>;
    subtotal: number;
    tax: number;
    ecoFee?: number;
    total: number;
    status: 'COMPLETED' | 'REFUNDED' | 'VOIDED';
    paymentMethod: PaymentMethod;
}

export interface Staff extends BaseEntity {
    name: string;
    employeeId: string;
    role: 'SYSTEM ADMIN' | 'STORE MANAGER' | 'CASHIER SENIOR' | 'CASHIER JUNIOR';
    terminalAccess: string[];
    lastSession: string;
    isOnline: boolean;
    avatarUrl?: string;
}
