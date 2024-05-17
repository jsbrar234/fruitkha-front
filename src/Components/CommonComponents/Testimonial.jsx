import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';



export const Testimonial = () => {
	return (
	  <div className="testimonial-section mt-150 mb-150">
		<Container>
		  <Row>
			<Col lg={10} className="offset-lg-1 text-center">
			  <Carousel>
				<Carousel.Item>
				  <div className="single-testimonial-slider">
					<div className="client-avater">
					  <img src="assets/img/avaters/avatar1.png" alt="Saira Hakim" />
					</div>
					<div className="client-meta">
					  <h3>Saira Hakim <span>Local shop owner</span></h3>
					  <p className="testimonial-body">
						"Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
					  </p>
					  <div className="last-icon">
						<i className="fas fa-quote-right"></i>
					  </div>
					</div>
				  </div>
				</Carousel.Item>
				<Carousel.Item>
				  <div className="single-testimonial-slider">
					<div className="client-avater">
					  <img src="assets/img/avaters/avatar2.png" alt="David Niph" />
					</div>
					<div className="client-meta">
					  <h3>David Niph <span>Local shop owner</span></h3>
					  <p className="testimonial-body">
						"Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
					  </p>
					  <div className="last-icon">
						<i className="fas fa-quote-right"></i>
					  </div>
					</div>
				  </div>
				</Carousel.Item>
				<Carousel.Item>
				  <div className="single-testimonial-slider">
					<div className="client-avater">
					  <img src="assets/img/avaters/avatar3.png" alt="Jacob Sikim" />
					</div>
					<div className="client-meta">
					  <h3>Jacob Sikim <span>Local shop owner</span></h3>
					  <p className="testimonial-body">
						"Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
					  </p>
					  <div className="last-icon">
						<i className="fas fa-quote-right"></i>
					  </div>
					</div>
				  </div>
				</Carousel.Item>
			  </Carousel>
			</Col>
		  </Row>
		</Container>
	  </div>
	);
  }
  

  