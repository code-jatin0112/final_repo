function animateCount(id, end) {
            let start = 0;
            const duration = 2000;
            const increment = end / (duration / 16);
            const element = document.getElementById(id);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    element.textContent = end;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = document.getElementById('scrollTop');
            const navbar = document.getElementById('navbar');
            const currentScroll = window.pageYOffset;

            if (currentScroll > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }

            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            lastScroll = currentScroll;
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function scrollToSection(id) {
            const element = document.getElementById(id);
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            document.getElementById('navLinks').classList.remove('active');
        }

        function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('active');
        }

        let currentFilter = 'all';

        function filterByRole(role) {
            currentFilter = role;
            const cards = document.querySelectorAll('.squad-card');
            const buttons = document.querySelectorAll('.filter-btn');
            
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            cards.forEach(card => {
                if (role === 'all' || card.dataset.role === role) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        function filterSquad() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const cards = document.querySelectorAll('.squad-card');

            cards.forEach(card => {
                const name = card.querySelector('.squad-name').textContent.toLowerCase();
                
                if (name.includes(searchTerm)) {
                    if (currentFilter === 'all' || card.dataset.role === currentFilter) {
                        card.style.display = 'block';
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function showModal(name, description, linkedin, github) {
            document.getElementById('modalTitle').textContent = name;
            document.getElementById('modalDescription').textContent = description;
            
            document.getElementById('modalLinks').innerHTML = `
                <a href="${linkedin}" target="_blank" class="modal-btn">LinkedIn</a>
                <a href="${github}" target="_blank" class="modal-btn">GitHub</a>
            `;
            
            document.getElementById('modalPhoto').style.display = 'none';
            document.getElementById('modal').classList.add('show');
        }

        function showMentorModal(name, role, description, photo, linkedin, github) {
            document.getElementById('modalTitle').textContent = name;
            document.getElementById('modalDescription').textContent = description;
    
            const modalPhoto = document.getElementById('modalPhoto');
            if (photo) {
                modalPhoto.src = photo;
                modalPhoto.alt = name;
                modalPhoto.style.display = 'block';
            } else {
                modalPhoto.style.display = 'none';
            }
    
            // Add LinkedIn button (and GitHub only if provided)
            let linksHTML = '';
            if (linkedin) {
                linksHTML += `<a href="${linkedin}" target="_blank" class="modal-btn">LinkedIn</a>`;
            }
            if (github) {
                linksHTML += `<a href="${github}" target="_blank" class="modal-btn">GitHub</a>`;
            }
    
            document.getElementById('modalLinks').innerHTML = linksHTML;
            document.getElementById('modal').classList.add('show');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('show');
        }

        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        }

        window.addEventListener('load', () => {
            setTimeout(() => {
                animateCount('managerCount', 1);
                animateCount('mentorCount', 6);
                animateCount('squadCount', 19);
            }, 500);
        });