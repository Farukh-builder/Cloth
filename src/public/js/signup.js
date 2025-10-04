console.log("Signup frontend javascript file (modernized)");

$(function () {
    // File upload handling
    const fileInput = $(".file-box .upload-hidden");
    const uploadPreview = $(".upload-img-frame");
    const uploadName = $(".upload-name");

    fileInput.on("change", function () {
        const file = this.files[0];
        if (!file) return;

        const validTypes = ["image/jpg", "image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            alert("Please insert only jpeg, png, or jpg!");
            $(this).val(""); // Reset invalid file
            uploadPreview.removeClass("success").attr("src", "");
            uploadName.val("Choose image");
            return;
        }

        // Preview image
        const fileURL = URL.createObjectURL(file);
        uploadPreview.attr("src", fileURL).addClass("success");

        // Show filename
        uploadName.val(file.name);
    });
});

// Form validation
function validateSignupForm() {
    const memberNick = $(".member-nick").val().trim();
    const memberPhone = $(".member-phone").val().trim();
    const memberPassword = $(".member-password").val();
    const confirmPassword = $(".confirm-password").val();
    const memberImage = $(".member-image").get(0)?.files[0];

    if (!memberNick || !memberPhone || !memberPassword || !confirmPassword) {
        alert("Please fill in all required inputs.");
        return false;
    }

    if (memberPassword !== confirmPassword) {
        alert("Passwords do not match. Please check.");
        return false;
    }

    if (!memberImage) {
        alert("Please insert a restaurant image!");
        return false;
    }

    return true; // All checks passed
}
