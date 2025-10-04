import client from "./src/config/hasuraClient.js";
import { gql } from "@apollo/client";

async function seedSuppliers() {
  const INSERT_SUPPLIERS = gql`
    mutation InsertSuppliers($objects: [suppliers_insert_input!]!) {
      insert_suppliers(objects: $objects) {
        returning {
          id
          name
          email
        }
      }
    }
  `;

  const suppliersData = [
    {
      code: "SUP001",
      name: "Công ty ABC",
      contact_name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "contact@abc.com",
      address: "123 Trần Hưng Đạo, Hà Nội",
      country: "VN",
      tax_code: "0101234567",
      website: "https://abc.com",
      status: "active",
    },
    {
      code: "SUP002",
      name: "Công ty XYZ",
      contact_name: "Trần Thị B",
      phone: "0907654321",
      email: "sales@xyz.vn",
      address: "456 Lê Lợi, TP.HCM",
      country: "VN",
      tax_code: "0309876543",
      website: "https://xyz.vn",
      status: "active",
    },
  ];

  const res = await client.mutate({
    mutation: INSERT_SUPPLIERS,
    variables: { objects: suppliersData },
  });
  console.log("Seed suppliers:", res.data.insert_suppliers.returning);
}

async function seedProducts() {
  const INSERT_PRODUCTS = gql`
    mutation InsertProducts($objects: [products_insert_input!]!) {
      insert_products(objects: $objects) {
        returning {
          id
          name
          sku
        }
      }
    }
  `;

  const productsData = [
    {
      name: "Sản phẩm A",
      sku: "PROD001",
      barcode: "8938505971234",
      description: "Sản phẩm A mô tả",
      price: 120000,
      cost: 80000,
      category_id: null, // nếu chưa có categories thì để null
      supplier_id: 1,    // giả sử supplier đầu tiên có id=1
      unit: "pcs",
      stock_min: 10,
      stock_max: 200,
      status: "active",
      is_perishable: false,
    },
    {
      name: "Sản phẩm B",
      sku: "PROD002",
      barcode: "8938505975678",
      description: "Sản phẩm B mô tả",
      price: 50000,
      cost: 30000,
      category_id: null,
      supplier_id: 2,    // giả sử supplier thứ 2 có id=2
      unit: "box",
      stock_min: 5,
      stock_max: 100,
      status: "active",
      is_perishable: true,
      expiry_date: "2025-12-31",
    },
  ];

  const res = await client.mutate({
    mutation: INSERT_PRODUCTS,
    variables: { objects: productsData },
  });
  console.log("Seed products:", res.data.insert_products.returning);
}

async function runSeed() {
  await seedSuppliers();
  await seedProducts();
}

runSeed().catch((err) => console.error(err));
