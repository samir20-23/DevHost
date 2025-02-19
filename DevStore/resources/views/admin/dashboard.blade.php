{{-- <x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard')
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("You're logged in!")
                </div>
            </div>
        </div>
    </div>
</x-app-layout> --}}
@extends('layouts.app')

{{-- Customize layout sections --}}

@section('subtitle', 'Dashboard')
@section('content_header_title', 'Dashboard')
{{-- @section('content_header_subtitle', 'stastique') --}}

{{-- Content body: main page content --}}

@section('content_body')

    {{-- @section('content') --}}


    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <!-- Box 1 -->
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>12</h3>
                            <p class="fs-3 fw-bold">Users</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <a href="" class="small-box-footer">plus infos <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->

                <!-- Box 2 -->
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-success">
                        <div class="inner">
                            <h3>54</sup></h3>
                            <p class="fs-3 fw-bold">Articles</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-newspaper"></i>
                        </div>
                        <a href="" class="small-box-footer">plus infos <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
                <!-- Box 3 -->
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-warning">
                        <div class="inner">
                            <h3>67</h3>
                            <p class="fs-3 fw-bold">Catégories</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-layer-group"></i>
                        </div>
                        <a href=")" class="small-box-footer">plus infos <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->

                <!-- Box 4 -->
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-danger">
                        <div class="inner">
                            <h3>2767</h3>
                            <p class="fs-3 fw-bold">Commentaires</p>
                        </div>
                        <div class="icon">
                            <i class="fas fa-comment"></i>
                        </div>
                        <a href="" class="small-box-footer">plus infos <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                <!-- ./col -->
            </div>
        </div>
    </section>

    {{-- @endsection --}}

@stop
