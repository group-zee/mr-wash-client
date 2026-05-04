# Database Schema Design for Mr. Wash

This is a complete relational database design (optimized for PostgreSQL/MySQL) tailored for a laundry aggregator marketplace like Mr. Wash. It separates concerns between Customers and Vendors, while connecting them through Services and Bookings.

---

## 1. Customers Module

### `customers`
Stores primary customer account information.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `first_name` | VARCHAR(50) | NOT NULL | Customer's first name |
| `last_name` | VARCHAR(50) | NOT NULL | Customer's last name |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | Customer email address |
| `phone_number` | VARCHAR(20) | UNIQUE, NOT NULL | Customer phone number |
| `password_hash` | VARCHAR(255) | NOT NULL | Securely hashed password |
| `avatar_url` | VARCHAR(255) | NULL | Profile image URL |
| `is_verified` | BOOLEAN | DEFAULT FALSE | Email/Phone verification status |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

### `customer_addresses`
Allows customers to save multiple pickup/drop-off locations.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `customer_id` | UUID | FOREIGN KEY (`customers.id`) | References the customer |
| `label` | VARCHAR(50) | NOT NULL | e.g., "Home", "Office" |
| `address_line1` | VARCHAR(255) | NOT NULL | Flat, House no., Building |
| `address_line2` | VARCHAR(255) | NULL | Area, Street, Sector, Village |
| `city` | VARCHAR(100) | NOT NULL | City name |
| `state` | VARCHAR(100) | NOT NULL | State name |
| `postal_code` | VARCHAR(20) | NOT NULL | ZIP / PIN code |
| `latitude` | DECIMAL(10,8) | NULL | Geo-location coordinate |
| `longitude` | DECIMAL(11,8)| NULL | Geo-location coordinate |
| `is_default` | BOOLEAN | DEFAULT FALSE | Is this the default address? |

---

## 2. Vendors Module

### `vendors`
Stores the vendor's business account information.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `owner_name` | VARCHAR(100) | NOT NULL | Name of the business owner |
| `business_name` | VARCHAR(150) | NOT NULL | Name of the shop (e.g., "Crystal Clean") |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | Business email address |
| `phone_number` | VARCHAR(20) | UNIQUE, NOT NULL | Business contact number |
| `password_hash` | VARCHAR(255) | NOT NULL | Securely hashed password |
| `gst_number` | VARCHAR(50) | UNIQUE, NULL | Tax Identification Number |
| `status` | ENUM | DEFAULT 'PENDING' | 'PENDING', 'ACTIVE', 'SUSPENDED' |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |

### `vendor_shops`
Public-facing profiles for the vendors (what the customer sees).

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `vendor_id` | UUID | FOREIGN KEY (`vendors.id`) | References the vendor account |
| `cover_image_url`| VARCHAR(255) | NULL | Shop display image |
| `address` | VARCHAR(255) | NOT NULL | Full physical address of the shop |
| `latitude` | DECIMAL(10,8) | NOT NULL | Used for proximity search |
| `longitude` | DECIMAL(11,8)| NOT NULL | Used for proximity search |
| `open_time` | TIME | NOT NULL | Daily opening time |
| `close_time` | TIME | NOT NULL | Daily closing time |
| `price_range` | ENUM | NOT NULL | '₹', '₹₹', '₹₹₹' |
| `specialty` | VARCHAR(100) | NULL | e.g., "Express 2h Delivery" |
| `is_open` | BOOLEAN | DEFAULT TRUE | Manual toggle for accepting orders |

---

## 3. Services Module

### `services`
Catalog of laundry services offered by specific vendors.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `shop_id` | UUID | FOREIGN KEY (`vendor_shops.id`)| References the specific shop |
| `name` | VARCHAR(100) | NOT NULL | e.g., 'Wash & Fold', 'Dry Clean' |
| `description` | TEXT | NULL | Service details |
| `price` | DECIMAL(10,2) | NOT NULL | Cost of the service |
| `unit` | ENUM | NOT NULL | 'kg', 'piece', 'pair' |
| `is_active` | BOOLEAN | DEFAULT TRUE | Is this service currently available? |

---

## 4. Bookings & Orders Module

### `bookings`
The core transactional table linking customers to vendors.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `booking_ref` | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable order ID (e.g., #MW-1029) |
| `customer_id` | UUID | FOREIGN KEY (`customers.id`) | Who placed the order |
| `shop_id` | UUID | FOREIGN KEY (`vendor_shops.id`)| Which shop is fulfilling it |
| `address_id` | UUID | FOREIGN KEY (`customer_addresses.id`) | Pickup/Dropoff location |
| `status` | ENUM | DEFAULT 'PLACED' | 'PLACED', 'PICKED_UP', 'IN_PROCESS', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED' |
| `subtotal` | DECIMAL(10,2) | NOT NULL | Sum of items |
| `delivery_fee` | DECIMAL(10,2) | DEFAULT 0.00 | Delivery charges |
| `total_amount` | DECIMAL(10,2) | NOT NULL | Final amount to be paid |
| `payment_status`| ENUM | DEFAULT 'PENDING' | 'PENDING', 'PAID', 'FAILED', 'REFUNDED' |
| `payment_method`| ENUM | NULL | 'CASH', 'CARD', 'UPI' |
| `pickup_time` | TIMESTAMP | NULL | Scheduled pickup time |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Order placement time |

### `booking_items`
Line items for a specific booking (like items in a cart).

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `booking_id` | UUID | FOREIGN KEY (`bookings.id`) | References the parent booking |
| `service_id` | UUID | FOREIGN KEY (`services.id`) | The service requested |
| `quantity` | DECIMAL(10,2) | NOT NULL | How many kg / pieces |
| `unit_price` | DECIMAL(10,2) | NOT NULL | Price at the time of booking |
| `total_price` | DECIMAL(10,2) | NOT NULL | `quantity` * `unit_price` |

---

## 5. Reviews Module

### `reviews`
Allows customers to rate their experience with a vendor.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `customer_id` | UUID | FOREIGN KEY (`customers.id`) | Who wrote the review |
| `shop_id` | UUID | FOREIGN KEY (`vendor_shops.id`)| The shop being reviewed |
| `booking_id` | UUID | FOREIGN KEY (`bookings.id`) | The order this review is for |
| `rating` | DECIMAL(2,1) | CHECK (rating>=1 AND rating<=5) | Star rating out of 5 |
| `comment` | TEXT | NULL | Text review / feedback |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Review posting time |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update time |
