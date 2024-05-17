import React from 'react'

export const BreadCrumb = (props) => {
    const {data} = props
  return (
    <div class="breadcrumb-section breadcrumb-bg">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 offset-lg-2 text-center">
					<div class="breadcrumb-text">
						<p>{data.desc}</p>
						<h1>{data.title}</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}
