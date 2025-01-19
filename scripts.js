document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    // Tab navigation
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((btn) => btn.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");

            if (tab.dataset.tab === "products") fetchProducts();
            if (tab.dataset.tab === "orders") fetchOrders();
            if (tab.dataset.tab === "suppliers") fetchSuppliers();
            if (tab.dataset.tab === "stocks") fetchStocks();
        });
    });

    // Fetch data functions
    function fetchProducts() {
        fetch("https://inventory-management-hcep.onrender.com/api/products/")
            .then((response) => response.json())
            .then((data) => {
                const tableBody = document.getElementById("productTableBody");
                tableBody.innerHTML = "";
                data.forEach((product) => {
                    const row = `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.description}</td>
                            <td>${product.category}</td>
                            <td>${product.price}</td>
                            <td>${product.stock_quantity}</td>
                            <td>${product.supplier}</td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch((error) => console.error("Error fetching products:", error));
    }

    function fetchOrders() {
        fetch("https://inventory-management-hcep.onrender.com/api/sale_orders/")
            .then((response) => response.json())
            .then((data) => {
                const tableBody = document.getElementById("orderTableBody");
                tableBody.innerHTML = "";
                data.forEach((order) => {
                    const row = `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.quantity}</td>
                            <td>${order.total_price}</td>
                            <td>${order.sale_date}</td>
                            <td>${order.status}</td>
                            <td>${order.product}</td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch((error) => console.error("Error fetching orders:", error));
    }

    function fetchSuppliers() {
        fetch("https://inventory-management-hcep.onrender.com/api/suppliers/")
            .then((response) => response.json())
            .then((data) => {
                const tableBody = document.getElementById("supplierTableBody");
                tableBody.innerHTML = "";
                data.forEach((supplier) => {
                    const row = `
                        <tr>
                            <td>${supplier.id}</td>
                            <td>${supplier.name}</td>
                            <td>${supplier.email}</td>
                            <td>${supplier.phone}</td>
                            <td>${supplier.address}</td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch((error) => console.error("Error fetching suppliers:", error));
    }

    function fetchStocks() {
        fetch("https://inventory-management-hcep.onrender.com/api/products/stock_levels/")
            .then((response) => response.json())
            .then((data) => {
                const tableBody = document.getElementById("stockTableBody");
                tableBody.innerHTML = "";
                data.forEach((stock) => {
                    const row = `
                        <tr>
                            <td>${stock.name}</td>
                            <td>${stock.stock_quantity}</td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch((error) => console.error("Error fetching stocks:", error));
    }

    // Add Product
    document.getElementById("addProductButton").addEventListener("click", () => {
        showTab("addProduct");
    });

    document.getElementById("addProductForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const productData = Object.fromEntries(formData.entries());
        fetch("https://inventory-management-hcep.onrender.com/api/products/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        })
            .then((response) => response.json())
            .then(() => {
                alert("Product added successfully!");
                showTab("products");
                fetchProducts();
            })
            .catch((error) => console.error("Error adding product:", error));
    });

    document.getElementById("backToProducts").addEventListener("click", () => {
        showTab("products");
    });

    // Add Order
    document.getElementById("addOrderButton").addEventListener("click", () => {
        showTab("addOrder");
    });

    document.getElementById("addOrderForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const orderData = Object.fromEntries(formData.entries());
        fetch("https://inventory-management-hcep.onrender.com/api/sale_orders/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then(() => {
                alert("Order added successfully!");
                showTab("orders");
                fetchOrders();
            })
            .catch((error) => console.error("Error adding order:", error));
    });

    document.getElementById("backToOrders").addEventListener("click", () => {
        showTab("orders");
    });

    // Add Supplier
    document.getElementById("addSupplierButton").addEventListener("click", () => {
        showTab("addSupplier");
    });

    document.getElementById("addSupplierForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const supplierData = Object.fromEntries(formData.entries());
        fetch("https://inventory-management-hcep.onrender.com/api/suppliers/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(supplierData),
        })
            .then((response) => response.json())
            .then(() => {
                alert("Supplier added successfully!");
                showTab("suppliers");
                fetchSuppliers();
            })
            .catch((error) => console.error("Error adding supplier:", error));
    });

    document.getElementById("backToSuppliers").addEventListener("click", () => {
        showTab("suppliers");
    });

    function showTab(tabId) {
        tabContents.forEach((content) => content.classList.remove("active"));
        document.getElementById(tabId).classList.add("active");
    }
});
