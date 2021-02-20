import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { MenuPageComponent } from "./menu-page/menu-page.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";


const appRoutes: Routes = [
  { path: 'menu', component: MenuPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: "", redirectTo: "/menu", pathMatch: "full" },
  { path: "**", redirectTo: "/menu" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
