@extends('master')


@section('app')

	<div class="container mt-4">
		<div class="row">
			<div class="col-12 text-center">
				<h1>Experience Japan!</h1>
			</div>
		</div>

		@include('partials.search')
		@include('partials.city-details-card')
		@include('partials.footer')



	</div>

@endsection