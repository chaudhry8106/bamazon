USE bamazon_db;

INSERT INTO products (products_name, department_name, price, stock_quantity)
VALUES  ('Holmes HEPA Air Purifier', 'Appliances', 21.78, 19),
        ('Luxo Professional Combination Clamp-On Lamps', 'Office Furnishings', 102.3, 35),
        ('Panasonic KX-P1150 Dot Matrix Printer', 'Office Machines', 145.45, 39),
        ('Self-Adhesive Address Labels for Typewriters by Universal', 'Labels', 7.31, 45),
        ('Xerox 198', 'Paper', 4.98, 44),
        ('Sauder Facets Collection Library, Sky Alder Finish', 'Bookcases', 170.98, 34),
        ('Hoover Portapower™ Portable Vacuum', 'Appliances', 4.48, 9),
        ('Linden® 12 Wall Clock With Oak Frame', 'Office Furnishings', 33.98, 25),
        ('Polycom ViewStation™ Adapter H323 Videoconferencing Unit', 'Office Machines', 938.02, 12),
        ('Eldon Econocleat® Chair Mats for Low Pile Carpets', 'Office Furnishings', 41.47, 47);

SELECT * FROM products;