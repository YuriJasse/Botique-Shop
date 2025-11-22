// Modern E-commerce JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('bar');
    const mobileMenu = document.getElementById('navbar');
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById('back-to-top');
    const cartButtons = document.querySelectorAll('.action-btn[title="Add to Cart"]');
    const wishlistButtons = document.querySelectorAll('.action-btn[title="Add to Wishlist"]');
    const quickViewButtons = document.querySelectorAll('.action-btn[title="Quick View"]');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Mobile Menu Functionality
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle between hamburger and close icon
            if (mobileMenu.classList.contains('active')) {
                mobileMenuButton.classList.remove('fa-bars');
                mobileMenuButton.classList.add('fa-times');
            } else {
                mobileMenuButton.classList.remove('fa-times');
                mobileMenuButton.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('#navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                mobileMenuButton.classList.remove('fa-times');
                mobileMenuButton.classList.add('fa-bars');
            });
        });
    }
    
    // Sticky Header on Scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Back to Top Button
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add to Cart Functionality
    if (cartButtons.length > 0) {
        cartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    let count = parseInt(cartCount.textContent) || 0;
                    cartCount.textContent = count + 1;
                    cartCount.classList.add('bump');
                    
                    // Add item to cart (in a real app, this would be an API call)
                    showNotification('Item added to cart!');
                    
                    // Animation
                    setTimeout(() => {
                        cartCount.classList.remove('bump');
                    }, 300);
                }
            });
        });
    }
    
    // Add to Wishlist Functionality
    if (wishlistButtons.length > 0) {
        wishlistButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const icon = button.querySelector('i');
                
                // Toggle wishlist state
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas', 'active');
                    showNotification('Added to wishlist!');
                } else {
                    icon.classList.remove('fas', 'active');
                    icon.classList.add('far');
                    showNotification('Removed from wishlist');
                }
            });
        });
    }
    
    // Quick View Modal
    if (quickViewButtons.length > 0) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real app, this would open a modal with product details
                showNotification('Quick view coming soon!');
            });
        });
    }
    
    // Newsletter Form Submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real app, this would be an API call
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Product Image Hover Effect
    const productImages = document.querySelectorAll('.product-img-container');
    if (productImages.length > 0) {
        productImages.forEach(container => {
            const img = container.querySelector('img');
            if (img) {
                const secondImage = img.getAttribute('data-second-image');
                if (secondImage) {
                    container.addEventListener('mouseenter', () => {
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.src = secondImage;
                            img.style.opacity = '1';
                        }, 200);
                    });
                    
                    container.addEventListener('mouseleave', () => {
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.src = img.getAttribute('data-original-src');
                            img.style.opacity = '1';
                        }, 200);
                    });
                }
            }
        });
    }
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Initialize any plugins or libraries here
    // For example: new Swiper('.testimonial-slider', { ... });
});

// Product Quantity Selector
class QuantitySelector {
    constructor(container) {
        this.container = container;
        this.input = container.querySelector('input[type="number"]');
        this.minusBtn = container.querySelector('.qty-minus');
        this.plusBtn = container.querySelector('.qty-plus');
        
        if (this.minusBtn && this.plusBtn && this.input) {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        this.minusBtn.addEventListener('click', () => this.decrement());
        this.plusBtn.addEventListener('click', () => this.increment());
        this.input.addEventListener('change', () => this.validate());
    }
    
    decrement() {
        let value = parseInt(this.input.value) || 0;
        if (value > 1) {
            this.input.value = value - 1;
            this.triggerChange();
        }
    }
    
    increment() {
        let value = parseInt(this.input.value) || 0;
        const max = parseInt(this.input.getAttribute('max')) || Infinity;
        
        if (value < max) {
            this.input.value = value + 1;
            this.triggerChange();
        }
    }
    
    validate() {
        let value = parseInt(this.input.value) || 1;
        const min = parseInt(this.input.getAttribute('min')) || 1;
        const max = parseInt(this.input.getAttribute('max')) || Infinity;
        
        if (value < min) value = min;
        if (value > max) value = max;
        
        this.input.value = value;
        this.triggerChange();
    }
    
    triggerChange() {
        const event = new Event('change', { bubbles: true });
        this.input.dispatchEvent(event);
    }
}

// Initialize quantity selectors on the page
document.addEventListener('DOMContentLoaded', () => {
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    quantitySelectors.forEach(selector => {
        new QuantitySelector(selector);
    });
});
