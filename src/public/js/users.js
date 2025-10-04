console.log("Users frontend JavaScript file loaded");

$(function () {
    // User status update
    $(".member-status").on("change", async function () {
        const $select = $(this);       // faqat shu element
        const id = $select.attr("id");
        const memberStatus = $select.val();

        // Loading effekt
        $select.prop("disabled", true).css("opacity", 0.6);

        try {
            const response = await axios.post("/admin/user/edit", { _id: id, memberStatus });
            const result = response.data;

            if (result.data) {
                console.log(`User ${id} status updated to ${memberStatus}`);

                // Muvaffaqiyatli update: yashil rang
                $select.css("background-color", "#d4edda");
                setTimeout(() => $select.css("background-color", "#fff"), 1000);
            } else {
                alert("User update failed!");
                $select.css("background-color", "#f8d7da"); // xato rang
            }
        } catch (err) {
            console.error(err);
            alert("User update failed!");
            $select.css("background-color", "#f8d7da"); // xato rang
        } finally {
            $select.prop("disabled", false).css("opacity", 1);
            $select.blur();
        }
    });

    // Optional: filter users by status
    $("#filter-status").on("change", function () {
        const status = $(this).val();
        $(".user-table tbody tr").each(function () {
            const rowStatus = $(this).find(".member-status").val();
            if (status === "ALL" || status === rowStatus) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
