using { cap1 } from '../db/schema';

service CatalogService {
    entity Customers as projection on cap1.Customers;

    entity Products as projection on cap1.Products;

    entity Orders as projection on cap1.Orders;

    entity OrderItems as projection on cap1.OrderItems;

}