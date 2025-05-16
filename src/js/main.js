// Country Code Configuration
const CONFIG = {
  countryCodes: {
    BR: '+55',
    PT: '+351',
    US: '+1'  
  }
};

// E-mail Validation
function validateEmail(email) {
  if (!email) return 'Email is required';
  if (!email.includes('@')) return 'Email must contain @ symbol';
  if (!email.includes('.')) return 'Email must contain a domain (e.g., .com)';

  const [localPart, domain] = email.split('@');
  if (localPart.length > 64) return 'Local part of email cannot exceed 64 characters';
  if (domain.length > 255) return 'Domain part of email cannot exceed 255 characters';

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';

  return '';
}

// Update Country Code
function updateCountryCode() {
  const selectedCountry = $('#countrySelect').val();
  const code = CONFIG.countryCodes[selectedCountry] || '';
  $('#countryCode').val(code);
}

// Form Validation
function validateForm() {
  let isValid = true;
  const $form = $('form');
  const $emailInput = $('input[type="email"]');

  // Valida email
  const emailError = validateEmail($emailInput.val());
  if (emailError) {
    $emailInput
      .addClass('border-red-500')
      .removeClass('border-green-500')
      .after(`<span class="email-feedback text-red-500 text-xs mt-1 block">${emailError}</span>`);
    isValid = false;
  }

  // Validate required fields
  $form.find('input[required], select[required]').each(function() {
    const $field = $(this);
    const $errorMessage = $field.siblings('span.text-red-500');
    
    if ($field.is(':checkbox')) {
      if (!$field.is(':checked')) {
        $errorMessage.removeClass('hidden');
        isValid = false;
      }
    } else if ($field.val().trim() === '') {
      $errorMessage.removeClass('hidden');
      isValid = false;
    }
  });

  return isValid;
}


// Initialization
$(document).ready(function() {
  const $mobileButton = $("#mobile-button"),
        $mobileMenu = $("#mobile-menu"),
        $closeButton = $("#close-menu");
  
  $mobileButton.on('click', function() {
    $mobileMenu.toggleClass("hidden flex");
  });
  
  $closeButton.on('click', function() {
    $mobileMenu.addClass("hidden").removeClass("flex");
  });
  
  $mobileMenu.on('click', function() {
    $mobileMenu.addClass("hidden").removeClass("flex");
  });
  
  const $form = $('form');
  const $emailInput = $('input[type="email"]');
  let emailTimeout;

  // Initialize Country Code
  $('#countrySelect').on('change', updateCountryCode);
  if ($('#countrySelect').val()) {
    updateCountryCode();
  }

  // Real-time E-mail Validation
  $emailInput.on('input', function() {
    clearTimeout(emailTimeout);
    const $input = $(this);
    
    $input
      .addClass('border-gray-300')
      .removeClass('border-red-500 border-green-500');
    $input.next('.email-feedback').remove();

    emailTimeout = setTimeout(() => {
      const errorMessage = validateEmail($input.val());
      $input.next('.email-feedback').remove();
      if (errorMessage) {
        $input
          .removeClass('border-gray-300 border-green-500')
          .addClass('border-red-500')
          .after(`<span class="email-feedback text-red-500 text-xs mt-1 block">${errorMessage}</span>`);
      } else {
        $input
          .removeClass('border-gray-300 border-red-500')
          .addClass('border-green-500');
      }
    }, 300);
  });

  // Validate email on blur
  $emailInput.on('blur', function() {
    const $input = $(this);
    const errorMessage = validateEmail($input.val());
    $input.next('.email-feedback').remove();
    if (errorMessage) {
      $input
        .removeClass('border-gray-300 border-green-500')
        .addClass('border-red-500')
        .after(`<span class="email-feedback text-red-500 text-xs mt-1 block">${errorMessage}</span>`);
    } else {
      $input
        .removeClass('border-gray-300 border-red-500')
        .addClass('border-green-500');
    }
  });

  // Validate required fields
  $form.find('input[required], select[required]').on('input change', function() {
    const $field = $(this);
    const $errorMessage = $field.siblings('span.text-red-500');
    
    if ($field.is(':checkbox')) {
      $errorMessage.toggleClass('hidden', $field.is(':checked'));
    } else {
      $errorMessage.toggleClass('hidden', $field.val().trim() !== '');
    }
  });

  // Form Validation on submission
  $form.on('submit', function(e) {
    if (!validateForm()) {
      e.preventDefault();
      return false;
    }
  });
});
