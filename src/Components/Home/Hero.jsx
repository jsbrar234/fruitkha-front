import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div class="hero-area hero-bg">
		<div class="container">
			<div class="row">
				<div class="col-lg-9 offset-lg-2 text-center">
					<div class="hero-text">
						<div class="hero-text-tablecell">
							<p class="subtitle">Fresh & Organic</p>
							<h1>Delicious Seasonal Fruits</h1>
							<div class="hero-btns">
								<Link to='/shop' class="boxed-btn">Fruit Collection</Link>
								<Link to='/contact' class="bordered-btn">Contact Us</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
};
