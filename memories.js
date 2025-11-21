function moveSlide(direction) {
        const btn = event.target;
        const container = btn.parentElement;
        const track = container.querySelector('.carousel, .carousel1, .carousel2');
        
        if (!track) return;

        const slides = track.querySelectorAll('img');
        if (slides.length === 0) return;

        let index = parseInt(container.dataset.index || '0', 10);

        index += direction;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        container.dataset.index = index;

        const slideWidth = slides[0].clientWidth;
        track.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
    }

    function next() {
        moveSlide(1);
    }

    function prev() {
        moveSlide(-1);
    }

    window.addEventListener('load', function () {
        document.querySelectorAll('.carousel, .carousel1, .carousel2').forEach(function (track) {
            track.style.transform = 'translateX(0)';
        });
    });