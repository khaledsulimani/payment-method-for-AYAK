// Quick amount button handlers
document.querySelectorAll('.amount-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        // Set amount value
        document.getElementById('amount').value = this.dataset.amount;
    });
});

// Format card number with spaces
document.getElementById('card-number').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Format expiry date
document.getElementById('expiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});

// Only allow numbers for CVV
document.getElementById('cvv').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Only allow numbers for card number
document.getElementById('card-number').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^\d\s]/g, '');
});

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const amount = document.getElementById('amount').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Basic validation
    if (!amount || !name || !email || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate card number length
    if (cardNumber.replace(/\s/g, '').length < 13) {
        alert('Please enter a valid card number');
        return;
    }
    
    // Validate CVV
    if (cvv.length < 3) {
        alert('Please enter a valid CVV');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    // IMPORTANT: Replace this with actual payment gateway integration
    setTimeout(() => {
        // Show success message
        alert(`Thank you for your ${amount} SAR donation! \u2764\ufe0f\n\nNote: This is a demo. To accept real donations, use:\n- PayPal Personal Account\n- Buy Me a Coffee\n- Ko-fi\n- Patreon\n\nSee README.md for setup instructions.`);
        
        // Reset form
        document.getElementById('payment-form').reset();
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Log donation details (for demo only)
        console.log('Donation Details (DEMO):', {
            amount: amount,
            name: name,
            email: email,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        });
    }, 2000);
});
