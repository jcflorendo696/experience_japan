@extends('master')


@section('app')

	<div class="container mt-4">
		<div class="row">
			<div class="col-12 text-center">
				<!-- <h1>Experience Japan!</h1> -->
				<img src="https://i.imgur.com/BcB01XZ.png" class="img-fluid" width="700">
			</div>
		</div>

		@include('partials.search')
		@include('partials.city-details-card')
		@include('partials.footer')



	</div>

@endsection