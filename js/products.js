/*
================================================================
  Products Section JavaScript
================================================================
*/

$(document).ready(function() {

    // Debounce function to limit the rate at which a function gets called.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // --- Waypoints for revealing cards on scroll ---
    // Using a waypoint to trigger animations for the whole section
    var $productsSection = $('.products-section');
    if ($productsSection.length) {
        $productsSection.waypoint(function(direction) {
            if (direction === 'down') {
                $('.product-card').each(function(index) {
                    // The CSS already has a transition delay, so we just add the class
                    $(this).addClass('is-visible');
                });

                // Animate metrics once visible
                animateMetrics();
                
                // 'destroy' the waypoint after it has been triggered once
                this.destroy();
            }
        }, {
            offset: '75%' // Trigger when the top of the element is 75% from the top of the viewport
        });
    }

    // --- Metric Count-Up Animation ---
    function animateMetrics() {
        $('.metric-chip .value').each(function () {
            var $this = $(this);
            var text = $this.text();
            
            // Extract number and any suffix (like K, M, +, %)
            var number = parseFloat(text.replace(/[^0-9.]/g, ''));
            var suffix = text.replace(/[0-9.]/g, '');

            if (!isNaN(number)) {
                $({ Counter: 0 }).animate({ Counter: number }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function (now) {
                        var val;
                        // Handle decimal points
                        if (number % 1 !== 0) {
                            val = now.toFixed(1);
                        } else {
                            val = Math.ceil(now);
                        }
                        $this.text(val + suffix);
                    },
                    complete: function() {
                        // Ensure final value is accurate
                        $this.text(text);
                    }
                });
            }
        });
    }
});
