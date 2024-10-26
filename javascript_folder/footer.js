document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer');
    
    const footerContent = `
      <footer>
        <div class="footer-container">
          <div class="social-media">
            <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
            <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" target="_blank"><i class="fab fa-x-twitter"></i></a>
            <a href="#" target="_blank"><i class="fab fa-tiktok"></i></a>
          </div>
          <div class="footer-logo">
            <h2>HubSpot</h2>
          </div>
          <div class="copyright">
            <p>Copyright © 2024 HubSpot, Inc.</p>
          </div>
          <div class="footer-links">
            <a href="#">Legal Stuff</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Security</a>
            <a href="#">Website Accessibility</a>
            <a href="#">Manage Cookies</a>
          </div>
        </div>
      </footer>
    `;
    
    setTimeout(() => {
      footerContainer.innerHTML = footerContent;
    }, 500);
});
