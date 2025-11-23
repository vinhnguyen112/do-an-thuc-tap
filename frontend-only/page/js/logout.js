// Logout function - clear localStorage and redirect to index
function logout() {
  // Clear all login information
  localStorage.removeItem('userType');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('isLoggedIn');
  
  // Redirect to home page
  return true; // Allow the link to proceed
}
