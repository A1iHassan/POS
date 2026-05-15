import { IsString, IsNumber, IsOptional } from "class-validator"
export class NewProductDto {

    @IsString()
    name: string

    @IsString()
    @IsOptional()
    id: string

    @IsNumber()
    quantity: number

    @IsString()
    expiry: string
}

type InsertedProduct = {
    name: string;
    id?: string | undefined;
    quantity?: number | undefined;
    expiry?: string | null | undefined;
}