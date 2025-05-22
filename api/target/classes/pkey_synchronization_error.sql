SELECT pg_get_serial_sequence('orders', 'order_id');
-- Par exemple : 'dbuser_user_id_seq'

SELECT setval('dbuser_user_id_seq', (SELECT MAX(order_id) FROM orders));