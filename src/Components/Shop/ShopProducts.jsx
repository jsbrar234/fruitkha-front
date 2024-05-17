import React from 'react'
import { ProductComponent } from './ProductComponent'

export const ShopProducts = () => {
  return (
    <>
        <div class="product-section mt-150 mb-150">
		<div class="container">

			

			<div class="row product-lists">
				<ProductComponent/>
			</div>

			{/* <div class="row">
				<div class="col-lg-12 text-center">
					<div class="pagination-wrap">
						<ul>
							<li><a href="#">Prev</a></li>
							<li><a href="#">1</a></li>
							<li><a class="active" href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">Next</a></li>
						</ul>
					</div>
				</div>
			</div> */}
		</div>
	</div>
    </>
  )
}
