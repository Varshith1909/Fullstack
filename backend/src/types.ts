// Defining the user creation payload
export type ICreateUserBody = {
	name: string;
	email: string;
};

// Defines the supplier creation payload
export type ICreateSupplierBody = {
	supplier_id: number;
	name: string;
	email: string;
	compName: string;
	addr: string;
	product: string;
	comp_Name: string;
};

// Defining the category creation payload
export interface ICreateCategoryBody {
	Id: number;
	name: string;
}

// Defining the purchase creation payload
export interface ICreatePurchaseBody {
	product: string;
	supplier_id: number;
	cost_price: number;
	quantity: number;
	expiry_date: Date;
	position: string;
}

// Defining the product creation payload
export interface ICreateProductBody {
	name: string;
	price: number;
	discount: number;
	description: string;
	position:string;
	expiry_date: Date;
	productId: number;
}

// Defining the sales creation payload
export interface ICreateSaleBody {
	productId: number;
	quantity: number;
	total_price: number;
}
