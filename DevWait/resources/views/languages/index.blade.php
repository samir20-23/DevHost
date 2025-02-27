@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row mb-4">
        <div class="col-md-8">
            <h1 class="fw-bold text-primary animate__animated animate__fadeIn">
                <i class="fas fa-code me-2"></i>Languages
            </h1>
        </div>
        <div class="col-md-4 text-end">
            <a href="{{ route('languages.create') }}" class="btn btn-primary btn-lg shadow animate__animated animate__pulse animate__infinite animate__slow">
                <i class="fas fa-plus-circle me-2"></i> Add Language
            </a>
        </div>
    </div>

    <div class="card shadow-lg border-0 mb-5 animate__animated animate__fadeInUp">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light">
                        <tr>
                            <th class="px-4 py-3"><i class="fas fa-image me-2"></i>Logo</th>
                            <th class="px-4 py-3"><i class="fas fa-tag me-2"></i>Name</th> 
                            <th class="px-4 py-3"><i class="fas fa-brain me-2"></i>Understand</th>
                            <th class="px-4 py-3"><i class="fas fa-code me-2"></i>Example</th>
                            <th class="px-4 py-3"><i class="fas fa-graduation-cap me-2"></i>Learning</th>
                            <th class="px-4 py-3"><i class="fas fa-tools me-2"></i>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($languages as $language)
                        <tr data-id="{{ $language->id }}" class="language-row">
                            <td class="px-4 py-3">
                                <div class="logo-container">
                                    <img src="https://skillicons.dev/icons?i={{ strtolower($language->logo) }}" 
                                         alt="{{ $language->logo }}" 
                                         class="language-logo animate__animated animate__fadeIn">
                                         <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=20&duration=4&pause=20&color=6D26BFFF&center=true&vCenter=true&width=300&lines={{ strtolower($language->name) }}" 
                                         alt="Typing SVG" class="img-fluid">
                                </div>
                            </td>
                            <td class="px-4 py-3"> 
                                <h3 class="language-name mb-2">{{ strtolower($language->name) }}</h3>

                            </td> 
                            <td class="px-4 py-3">
                                <div class="input-group">
                                    <span class="input-group-text bg-primary text-white">
                                        <i class="fas fa-percentage"></i>
                                    </span>
                                    <input type="number" 
                                           class="form-control form-control-sm status-input" 
                                           id="understand-{{ $language->id }}" 
                                           value="{{ $language->understand }}"
                                           data-field="understand">
                                </div>
                            </td>
                            <td class="px-4 py-3">
                                <div class="input-group">
                                    <span class="input-group-text bg-success text-white">
                                        <i class="fas fa-code"></i>
                                    </span>
                                    <input type="number" 
                                           class="form-control form-control-sm status-input" width="100%"
                                           id="example-{{ $language->id }}" 
                                           value="{{ $language->example }}"
                                           data-field="example">
                                </div>
                            </td>
                            <td class="px-4 py-3">
                                <div class="input-group">
                                    <span class="input-group-text bg-info text-white">
                                        <i class="fas fa-book"></i>
                                    </span>
                                    <input type="number" 
                                           class="form-control form-control-sm status-input" 
                                           id="learning-{{ $language->id }}" 
                                           value="{{ $language->learning }}"
                                           data-field="learning">
                                </div>
                            </td>
                            <td class="px-4 py-3">
                                <div class="btn-group action-buttons">
                                    <a href="{{ route('languages.description', $language->id) }}" 
                                       class="btn btn-info btn-sm me-1 tooltip-btn" 
                                       data-bs-toggle="tooltip" 
                                       title="View Documentation">
                                        <i class="fas fa-file-alt"></i> Readme
                                    </a>
                                    <a href="{{ $language->github_link }}" 
                                       target="_blank" 
                                       class="btn btn-dark btn-sm me-1 tooltip-btn" 
                                       data-bs-toggle="tooltip" 
                                       title="GitHub Repository">
                                        <i class="fab fa-github"></i> GitHub
                                    </a>
                                    <a href="{{ route('languages.edit', $language->id) }}" 
                                       class="btn btn-primary btn-sm tooltip-btn" 
                                       data-bs-toggle="tooltip" 
                                       title="Edit Language Details">
                                        <i class="fas fa-pencil-alt"></i> Edit
                                    </a>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Add additional CSS -->
<style>
.language-row {
    transition: all 0.3s ease;
}

.language-row:hover {
    background-color: rgba(0, 123, 255, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.language-logo {
    width: 60px;
    height: 60px;
    transition: all 0.3s ease;
}

.language-row:hover .language-logo {
    transform: scale(1.1) rotate(5deg);
}

.language-name {
    font-weight: 700;
    color: #6D26BF;
    transition: all 0.3s ease;
}

.language-row:hover .language-name {
    transform: translateX(5px);
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgba(240, 240, 240, 0.5);
    margin: 0 auto;
    transition: all 0.3s ease;
}

.language-row:hover .logo-container {
    background: rgba(109, 38, 191, 0.1);
}

.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

.status-input {
    transition: all 0.3s ease;
}

.status-input:focus {
    box-shadow: 0 0 0 0.25rem rgba(109, 38, 191, 0.25);
    border-color: #6D26BF;
}

.action-buttons {
    opacity: 0.8;
    transition: all 0.3s ease;
}

.language-row:hover .action-buttons {
    opacity: 1;
}

.animate__animated.animate__fadeIn {
    --animate-duration: 1s;
}

.animate__animated.animate__fadeInUp {
    --animate-duration: 0.8s;
}

.tooltip-btn {
    position: relative;
}

.language-description {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@keyframes pulse-border {
    0% {
        box-shadow: 0 0 0 0 rgba(109, 38, 191, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(109, 38, 191, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(109, 38, 191, 0);
    }
}

.status-input:focus {
    animation: pulse-border 2s infinite;
}
</style>

<!-- Update JavaScript -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"></script>
<script>
$(document).ready(function(){
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    
    // Animate rows on page load
    $(".language-row").each(function(index) {
        $(this).addClass("animate__animated animate__fadeInUp")
              .css("animation-delay", (index * 0.1) + "s");
    });
    
    // Status update functionality
    $(".status-input").change(function(){
        var id = $(this).closest('tr').data('id');
        var field = $(this).data('field');
        var value = $(this).val();
        var row = $(this).closest('tr');
        
        // Visual feedback during update
        $(this).addClass('animate__animated animate__pulse');
        
        var data = {
            _token: '{{ csrf_token() }}',
        };
        data[field] = value;
        
        // Show loading indicator
        var btn = $('<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary animate__animated animate__fadeIn"><i class="fas fa-sync-alt fa-spin"></i></span>');
        $(this).parent().append(btn);
        
        $.ajax({
            url: '/languages/' + id + '/status',
            method: 'POST',
            data: data,
            success: function(response){
                // Show success indicator
                btn.removeClass('bg-primary').addClass('bg-success animate__animated animate__bounceIn');
                btn.html('<i class="fas fa-check"></i>');
                
                // Display success message as toast
                var toast = $('<div class="toast position-fixed bottom-0 end-0 m-3 animate__animated animate__fadeInUp" role="alert" aria-live="assertive" aria-atomic="true">' +
                              '<div class="toast-header bg-success text-white">' +
                              '<i class="fas fa-check-circle me-2"></i>' +
                              '<strong class="me-auto">Updated Successfully</strong>' +
                              '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>' +
                              '</div>' +
                              '<div class="toast-body">' + response.message + '</div>' +
                              '</div>');
                
                $('body').append(toast);
                var bsToast = new bootstrap.Toast(toast);
                bsToast.show();
                
                // Remove the badge after 2 seconds
                setTimeout(function(){
                    btn.removeClass('animate__bounceIn').addClass('animate__fadeOut');
                    setTimeout(function(){
                        btn.remove();
                    }, 1000);
                }, 2000);
                
                // Add a highlight effect to the row
                row.addClass('animate__animated animate__highlight');
                setTimeout(function(){
                    row.removeClass('animate__highlight');
                }, 2000);
            },
            error: function(xhr, status, error){
                console.error('Error:', error);
                
                // Show error indicator
                btn.removeClass('bg-primary').addClass('bg-danger animate__animated animate__shakeX');
                btn.html('<i class="fas fa-exclamation-triangle"></i>');
                
                // Display error message
                var toast = $('<div class="toast position-fixed bottom-0 end-0 m-3 animate__animated animate__fadeInUp" role="alert" aria-live="assertive" aria-atomic="true">' +
                              '<div class="toast-header bg-danger text-white">' +
                              '<i class="fas fa-exclamation-circle me-2"></i>' +
                              '<strong class="me-auto">Error</strong>' +
                              '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>' +
                              '</div>' +
                              '<div class="toast-body">Error updating status: ' + error + '</div>' +
                              '</div>');
                
                $('body').append(toast);
                var bsToast = new bootstrap.Toast(toast);
                bsToast.show();
                
                // Remove the badge after 3 seconds
                setTimeout(function(){
                    btn.removeClass('animate__shakeX').addClass('animate__fadeOut');
                    setTimeout(function(){
                        btn.remove();
                    }, 1000);
                }, 3000);
            }
        });
    });
    
    // Add animation for button hover
    $(".btn").hover(
        function() {
            $(this).addClass("animate__animated animate__pulse");
        },
        function() {
            $(this).removeClass("animate__animated animate__pulse");
        }
    );
    
    // Add keyframe animation for custom highlight effect
    $("<style>")
        .prop("type", "text/css")
        .html(`
        @keyframes highlight {
            0% { background-color: transparent; }
            50% { background-color: rgba(109, 38, 191, 0.1); }
            100% { background-color: transparent; }
        }
        .animate__highlight {
            animation-name: highlight;
            animation-duration: 2s;
        }`)
        .appendTo("head");
});
</script>
@endsection