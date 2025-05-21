SELECT pg_get_serial_sequence('dbuser', 'user_id');
-- Par exemple : 'dbuser_user_id_seq'

SELECT setval('dbuser_user_id_seq', (SELECT MAX(user_id) FROM dbuser));