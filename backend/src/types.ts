export type ICreateUserBody = {
	name: string;
	email: string;
};

export type ICreateSupplierBody = {
	name: string;
	email: string;
	compName: string;
	addr: string;
	product: string;
};
export interface ICreateCategoryBody {
	Id: number;
	name: string;
}

export interface ICreatePurchaseBody {
	product: string;
	supplier_id: number;
	cost_price: number;
	quantity: number;
	expiry_date: Date;
	position: string;
}

export interface ICreateProductBody {
	name: string;
	price: number;
	discount: number;
	description: string;
	position:string;
	expiry_date: Date;
	productId: number;
}
export interface ICreateSaleBody {
	product_id: number;
	quantity: number;
	total_price: number;
}
