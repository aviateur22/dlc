import { Component, Input } from '@angular/core';
import { ProductSchema } from 'src/app/domain/ports/EntitiesSchemas/ProductSchema';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input()
  products: Array<ProductSchema> = [];
}
