// Configuration
// Load API configuration from config.js
// First, try to load config.js (user should create this file)
let API_CONFIG = {
    API_URL: 'https://api.remove.bg/v1.0/removebg',
    API_KEY: 'YOUR_REMOVE_BG_API_KEY' // Will be replaced by config.js
};

// Try to load user configuration
async function loadConfig() {
    try {
        const response = await fetch('./config.js');
        if (response.ok) {
            const configText = await response.text();
            // Simple parsing for config.js
            const apiKeyMatch = configText.match(/API_KEY:\s*['"]([^'"]+)['"]/);
            const apiUrlMatch = configText.match(/API_URL:\s*['"]([^'"]+)['"]/);
            
            if (apiKeyMatch && apiKeyMatch[1] !== 'YOUR_REMOVE_BG_API_KEY') {
                API_CONFIG.API_KEY = apiKeyMatch[1];
            }
            if (apiUrlMatch) {
                API_CONFIG.API_URL = apiUrlMatch[1];
            }
        }
    } catch (error) {
        console.log('config.js not found or error loading, using default configuration');
        console.log('Please create config.js with your remove.bg API key');
    }
}

// Initialize configuration
loadConfig();

// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadSection = document.getElementById('upload-section');
const processingSection = document.getElementById('processing-section');
const originalImage = document.getElementById('original-image');
const resultImage = document.getElementById('result-image');
const resultPlaceholder = document.getElementById('result-placeholder');
const processBtn = document.getElementById('process-btn');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

let currentFile = null;

// Event Listeners
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

processBtn.addEventListener('click', processImage);
downloadBtn.addEventListener('click', downloadImage);
resetBtn.addEventListener('click', resetApp);

// Functions
function handleFile(file) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        showError('Invalid file type. Please upload JPG, PNG, or WebP.');
        return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showError('File too large. Maximum size is 10MB.');
        return;
    }

    currentFile = file;

    // Display original image
    const reader = new FileReader();
    reader.onload = (e) => {
        originalImage.src = e.target.result;
        showProcessingSection();
    };
    reader.readAsDataURL(file);

    hideError();
}

async function processImage() {
    if (!currentFile) return;

    showLoading();
    hideError();

    try {
        const formData = new FormData();
        formData.append('image_file', currentFile);

        const response = await fetch(API_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'X-Api-Key': API_CONFIG.API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to process image');
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        resultImage.src = imageUrl;
        resultImage.classList.remove('hidden');
        resultPlaceholder.classList.add('hidden');
        downloadBtn.classList.remove('hidden');
        processBtn.classList.add('hidden');

    } catch (error) {
        console.error('Error processing image:', error);
        showError('Failed to process image. Please try again or check your API key.');
    } finally {
        hideLoading();
    }
}

function downloadImage() {
    if (!resultImage.src) return;

    const a = document.createElement('a');
    a.href = resultImage.src;
    a.download = `removed-background-${Date.now()}.png`;
    a.click();
}

function resetApp() {
    currentFile = null;
    originalImage.src = '';
    resultImage.src = '';
    resultImage.classList.add('hidden');
    resultPlaceholder.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    processBtn.classList.remove('hidden');

    fileInput.value = '';

    uploadSection.classList.remove('hidden');
    processingSection.classList.add('hidden');

    hideError();
}

function showProcessingSection() {
    uploadSection.classList.add('hidden');
    processingSection.classList.remove('hidden');
}

function showLoading() {
    loading.classList.remove('hidden');
    processBtn.disabled = true;
}

function hideLoading() {
    loading.classList.add('hidden');
    processBtn.disabled = false;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}
