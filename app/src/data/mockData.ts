import type { InventoryItem, Staff, Transaction } from './types';

// ==========================================
// MOCK DATA: INVENTORY
// ==========================================
export const mockInventory: InventoryItem[] = [
    {
        id: 'inv-1',
        sku: '#MNLT-7892-A',
        name: 'PRECISION CHRONOGRAPH V1',
        variant: 'TITANIUM STEEL / SILVER',
        category: 'ACCESSORIES',
        unitPrice: 249.00,
        stockLevel: 1420,
        stockStatus: 'IN STOCK',
        lastSync: 'LAST SYNC 2M AGO',
    },
    {
        id: 'inv-2',
        sku: '#MNLT-1200-K',
        name: 'ACOUSTIC OVER-EAR STUDIO',
        variant: 'MATTE BLACK / WIRELESS',
        category: 'ELECTRONICS',
        unitPrice: 189.50,
        stockLevel: 12,
        stockStatus: 'LOW STOCK',
        threshold: 20,
    },
    {
        id: 'inv-3',
        sku: '#MNLT-4421-L',
        name: 'HYDROCORE FLASK 1.5L',
        variant: 'BRUSHED ALUMINUM',
        category: 'LIFESTYLE',
        unitPrice: 45.00,
        stockLevel: 562,
        stockStatus: 'IN STOCK',
    },
    {
        id: 'inv-4',
        sku: '#MNLT-0092-B',
        name: 'NEXUS CONTROL PAD PRO',
        variant: 'ARCTIC WHITE',
        category: 'GAMING',
        unitPrice: 139.99,
        stockLevel: 0,
        stockStatus: 'SOLD OUT',
    },
    {
        id: 'inv-5',
        sku: '#MNLT-8812-Y',
        name: 'TACTILE MECHANICAL BOARD',
        variant: '65% LAYOUT / BLUE SWITCHES',
        category: 'ELECTRONICS',
        unitPrice: 115.00,
        stockLevel: 45,
        stockStatus: 'IN STOCK',
    }
];

// ==========================================
// MOCK DATA: STAFF
// ==========================================
export const mockStaff: Staff[] = [
    {
        id: 'staff-1',
        name: 'Marcus Thorne',
        employeeId: 'EID-9921-TS',
        role: 'SYSTEM ADMIN',
        terminalAccess: ['All Terminals'],
        lastSession: '14m ago',
        isOnline: true,
    },
    {
        id: 'staff-2',
        name: 'Elena Rodriguez',
        employeeId: 'EID-3024-SP',
        role: 'STORE MANAGER',
        terminalAccess: ['Terminals 01', '02'],
        lastSession: 'Active Now',
        isOnline: true,
    },
    {
        id: 'staff-3',
        name: 'Julian Chen',
        employeeId: 'EID-5542-DR',
        role: 'CASHIER SENIOR',
        terminalAccess: ['Terminal 01'],
        lastSession: '2h 45m ago',
        isOnline: false,
    },
    {
        id: 'staff-4',
        name: 'Sarah Jenkins',
        employeeId: 'EID-2283-LA',
        role: 'CASHIER JUNIOR',
        terminalAccess: ['Terminal 02'],
        lastSession: 'Active Now',
        isOnline: true,
    }
];

// ==========================================
// MOCK DATA: TRANSACTIONS
// ==========================================
export const mockTransactions: Transaction[] = [
    {
        id: 'txn-1',
        timestamp: 'OCT 24, 2023 | 14:22:10',
        orderRef: '#MN-89210-TX',
        customerName: 'ALEXANDER VAUGHN',
        terminalId: '01',
        items: [
            { inventoryId: 'inv-5', quantity: 2, unitPrice: 115.00 }, // Hinge (Substituted for mock)
            { inventoryId: 'inv-1', quantity: 2, unitPrice: 249.00 }, // Column
        ],
        subtotal: 1240.48,
        tax: 0.02,
        total: 1240.50,
        status: 'COMPLETED',
        paymentMethod: 'CREDIT CARD'
    },
    {
        id: 'txn-2',
        timestamp: 'OCT 24, 2023 | 13:58:45',
        orderRef: '#MN-89209-TX',
        customerName: 'CASSIE BLAKE',
        terminalId: '01',
        items: [],
        subtotal: 1220.00,
        tax: 0,
        total: 1220.00,
        status: 'COMPLETED',
        paymentMethod: 'CASH'
    },
    {
        id: 'txn-3',
        timestamp: 'OCT 24, 2023 | 13:15:22',
        orderRef: '#MN-89208-TX',
        customerName: '— CASH SALE —',
        terminalId: '01',
        items: [],
        subtotal: 89.15,
        tax: 0,
        total: 89.15,
        status: 'REFUNDED',
        paymentMethod: 'CASH'
    },
    {
        id: 'txn-4',
        timestamp: 'OCT 24, 2023 | 12:44:02',
        orderRef: '#MN-89207-TX',
        customerName: 'GREGORY HOUSE',
        terminalId: '01',
        items: [],
        subtotal: 312.50,
        tax: 0,
        total: 312.50,
        status: 'COMPLETED',
        paymentMethod: 'CREDIT CARD'
    }
];
