// Donation form handling with Supabase integration
document.addEventListener('DOMContentLoaded', function() {
    // Supabase configuration
    const SUPABASE_URL = 'https://bbgcdfutaihlnuwbcruip.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ2NkZnV0YWlobG51d2JjcnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTMyMTEsImV4cCI6MjA3NDM2OTIxMX0.einRzV3s-WCdtxF1SK7nHYJGAUelZVJwcUI_Ohe2j_Q';
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // IntaSend configuration
    const intasend = new window.IntaSend({
        publicKey: "ISPubKey_live_413d9a4b-bd7d-43f6-bf08-f8fb33da8055",
        live: true
    });

    const donationForm = document.getElementById('donation-form');
    const donateBtn = document.getElementById('donate-btn');
    const btnText = donateBtn.querySelector('.btn-text');
    const btnLoading = donateBtn.querySelector('.btn-loading');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const errorMessage = document.getElementById('error-message');
    const donorsList = document.getElementById('donors-list');

    // Amount selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Set the amount in the hidden input
            const amount = this.dataset.amount;
            customAmountInput.value = amount;
        });
    });

    // Custom amount input handling
    customAmountInput.addEventListener('input', function() {
        // Remove active class from buttons when custom amount is entered
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Form submission
    donationForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading state
        donateBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        try {
            // Collect form data
            const formData = new FormData(donationForm);
            const donationData = {
                amount: parseInt(formData.get('amount')),
                first_name: formData.get('firstName'),
                last_name: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone') || null,
                donation_type: formData.get('donationType'),
                payment_method: formData.get('paymentMethod'),
                anonymous: formData.get('anonymous') === 'on',
                newsletter: formData.get('newsletter') === 'on',
                comments: formData.get('comments') || null,
                created_at: new Date().toISOString()
            };

            // Validate required fields
            if (!donationData.amount || donationData.amount < 100) {
                throw new Error('Please enter a valid donation amount (minimum KSh 100)');
            }

            if (!donationData.first_name || !donationData.last_name || !donationData.email) {
                throw new Error('Please fill in all required fields');
            }

            // Insert donation into Supabase
            const { data, error } = await supabase
                .from('donations')
                .insert([donationData])
                .select();

            if (error) {
                throw error;
            }

            donationData.id = data[0].id;

            // Process payment based on method
            await processPayment(donationData);

            // Show success message
            donationForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Send confirmation email (you might want to implement this on the backend)
            sendConfirmationEmail(donationData);

            // Refresh donors list
            loadRecentDonors();

        } catch (error) {
            console.error('Donation error:', error);
            showError(error.message || 'An error occurred while processing your donation. Please try again.');
        } finally {
            // Reset loading state
            donateBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });

    // Payment processing function
    async function processPayment(donationData) {
        switch (donationData.payment_method) {
            case 'intasend':
                return await processIntaSendPayment(donationData);
            case 'mpesa':
                return await processMpesaPayment(donationData);
            case 'card':
                return await processCardPayment(donationData);
            case 'bank':
                return await processBankTransfer(donationData);
            default:
                throw new Error('Invalid payment method selected');
        }
    }

    // M-Pesa payment processing
    async function processMpesaPayment(donationData) {
        // This would integrate with M-Pesa API
        // For now, we'll simulate the process
        console.log('Processing M-Pesa payment for:', donationData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real implementation, you would:
        // 1. Call M-Pesa STK Push API
        // 2. Handle the response
        // 3. Update donation status

        return { success: true, transactionId: 'MP' + Date.now() };
    }

    // Card payment processing
    async function processCardPayment(donationData) {
        // This would integrate with a payment processor like Stripe
        console.log('Processing card payment for:', donationData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        return { success: true, transactionId: 'CARD' + Date.now() };
    }

    // Bank transfer processing
    async function processBankTransfer(donationData) {
        // For bank transfers, we might just record the intent
        console.log('Recording bank transfer intent for:', donationData);

        // Update donation with bank transfer instructions
        const { error } = await supabase
            .from('donations')
            .update({
                payment_status: 'pending_bank_transfer',
                bank_instructions: 'Please transfer to: Account Name, Account Number, Bank Name'
            })
            .eq('id', donationData.id);

        if (error) throw error;

        return { success: true, transactionId: 'BANK' + Date.now() };
    }

    // IntaSend payment processing
    async function processIntaSendPayment(donationData) {
        console.log('Processing IntaSend payment for:', donationData);

        try {
            const response = await intasend.collection.charge({
                amount: donationData.amount,
                currency: "KES",
                email: donationData.email,
                first_name: donationData.first_name,
                last_name: donationData.last_name,
                phone_number: donationData.phone,
                api_ref: 'donation-' + donationData.id
            });

            console.log('IntaSend payment successful:', response);

            // Update donation status in Supabase
            const { error } = await supabase
                .from('donations')
                .update({
                    payment_status: 'completed',
                    transaction_id: response.id || response.tracking_id
                })
                .eq('id', donationData.id);

            if (error) throw error;

            return { success: true, transactionId: response.id || response.tracking_id };
        } catch (error) {
            console.error('IntaSend payment failed:', error);

            // Update donation status to failed
            await supabase
                .from('donations')
                .update({
                    payment_status: 'failed'
                })
                .eq('id', donationData.id);

            throw new Error('Payment processing failed. Please try again.');
        }
    }

    // Send confirmation email
    async function sendConfirmationEmail(donationData) {
        // This would typically be handled by your backend
        // For now, we'll just log it
        console.log('Sending confirmation email to:', donationData.email);

        // You could implement email sending via Supabase Edge Functions
        // or a separate email service
    }

    // Load recent donors
    async function loadRecentDonors() {
        try {
            const { data: donors, error } = await supabase
                .from('donations')
                .select('first_name, last_name, amount, created_at')
                .eq('anonymous', false)
                .eq('payment_status', 'completed')
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) throw error;

            displayDonors(donors);
        } catch (error) {
            console.error('Error loading donors:', error);
            donorsList.innerHTML = '<p>Unable to load recent donors at this time.</p>';
        }
    }

    // Display donors in the UI
    function displayDonors(donors) {
        if (!donors || donors.length === 0) {
            donorsList.innerHTML = '<p>Be the first to donate and see your name here!</p>';
            return;
        }

        const donorsHtml = donors.map(donor => {
            const name = `${donor.first_name} ${donor.last_name.charAt(0)}.`;
            const amount = `KSh ${donor.amount.toLocaleString()}`;
            const date = new Date(donor.created_at).toLocaleDateString();

            return `
                <div class="donor-item">
                    <div class="donor-name">${name}</div>
                    <div class="donor-amount">${amount}</div>
                    <div class="donor-date">${date}</div>
                </div>
            `;
        }).join('');

        donorsList.innerHTML = donorsHtml;
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        formError.style.display = 'block';
        donationForm.style.display = 'none';
    }

    // Initialize
    loadRecentDonors();

    // Form validation
    const inputs = donationForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const isValid = value !== '';

        field.classList.toggle('error', !isValid);
        field.classList.toggle('valid', isValid);

        return isValid;
    }

    // Amount validation
    customAmountInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        const isValid = value >= 100 && !isNaN(value);

        this.classList.toggle('error', !isValid && this.value !== '');
        this.classList.toggle('valid', isValid);
    });
});
