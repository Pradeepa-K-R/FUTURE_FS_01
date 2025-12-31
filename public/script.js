
try {
    var typed = new Typed(".multiple-text", {
        strings: ["CSE Student", "Web Developer", "Web-Designer", "Coder"], 
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
} catch (error) {
    console.log("Typed.js error (Check HTML linkage): ", error);
}


const submitBtn = document.querySelector('form button');
const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');

if (submitBtn) {
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 
        
        
        const name = inputs[0].value;
        const email = inputs[1].value;
        const message = textarea.value;

        
        if(!name || !email || !message) {
            alert("Please fill in all fields!");
            return;
        }

        
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";

        try {
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: name, 
                    email: email, 
                    message: message 
                })
            });

            const data = await response.json();

            
            if (response.ok && data.success) {
                alert("Message Sent Successfully! 🚀");
            
                inputs[0].value = "";
                inputs[1].value = "";
                textarea.value = "";
            } else {
                alert("Failed to send message. Please try again.");
            }

        } catch (error) {
            console.error('Error:', error);
            alert("Error: Server connection failed.");
        } finally {
            
            submitBtn.innerText = originalText;
        }
    });
}