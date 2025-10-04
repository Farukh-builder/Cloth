console.log("Products frontend javascript file");

$(function () {
    // Toggle new product form
    $("#process-btn").on("click", () => {
        $(".dish-container").slideToggle(500);
        $("#process-btn").hide();
    });

    $("#cancel-btn").on("click", () => {
        $(".dish-container").slideToggle(100);
        $("#process-btn").show();
    });

    // Product status update
    $(".new-product-status").on("change", async function (e) {
        const id = e.target.id;
        const productStatus = $(this).val();
        try {
            const response = await axios.post(`/admin/product/${id}`, { productStatus });
            const result = response.data;
            if (!result.data) alert("Product update failed!");
        } catch (err) {
            console.error(err);
            alert("Product update failed!");
        }
    });

    // Product collection change (optional logic)
    $(".product-collection").on("change", () => {
        const selectedValue = $(".product-collection").val();
        if (selectedValue === "DRINK") {
            $("#product-collection").hide();
            $("#product-volume").show();
        } else {
            $("#product-volume").hide();
            $("#product-collection").show();
        }
    });
});

// Form validation
function validateForm() {
    const productName = $(".product-name").val();
    const productPrice = $(".product-price").val();
    const productLeftCount = $(".product-left-count").val();
    const productCollection = $(".product-collection").val();
    const productDesc = $(".product-desc").val();
    const productStatus = $(".product-status").val();

    if (!productName || !productPrice || !productLeftCount || !productCollection || !productDesc || !productStatus) {
        alert("Please insert all details!");
        return false;
    }
    return true;
}

// Image preview
function previewFileHandler(input, order) {
    const file = input.files[0];
    if (!file) return;

    const validImagetype = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImagetype.includes(file.type)) {
        alert("Please insert only jpeg, png and jpg!");
        input.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
    };
    reader.readAsDataURL(file);
}
