namespace cap1;

using { cuid, managed } from '@sap/cds/common';

type Email : String(200);

type ProductCode : String(20);

type Amount : Decimal(15,2);

entity Customers : cuid, managed {
    name : String(100);
    email : Email;
    city : String(50);
    orders : Association to many Orders
                 on orders.customer=$self;
    
}

entity Products : cuid, managed {

    productCode : ProductCode;
    productName : String(100);
    price       : Amount;

    orderItems  : Association to many OrderItems
                  on orderItems.product = $self;
    
}
entity Orders : cuid, managed {

    orderNo  : String(20);
    orderDate : Date;

    customer : Association to one Customers;

    items : Composition of many OrderItems
                on items.order = $self;
    
}

entity OrderItems : cuid {

     quantity : Integer;
     price    : Amount;

    order   : Association to one Orders;
    product : Association to one Products;
    
}



