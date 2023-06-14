export type ICreateUserBody = {
	name: string;
	email: string;
};

export type ICreateSupplierBody = {
	supplier_id: number;
	name: string;
	email: string;
	compName: string;
	addr: string;
	product: string;
	comp_Name: string;
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
	productId: number;
	quantity: number;
	total_price: number;
}
