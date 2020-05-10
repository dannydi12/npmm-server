INSERT INTO users (email, password) 
VALUES
('demo@demo.com', 'demopassword');

INSERT INTO collections (user_id, collection_name)
VALUES
(1, 'React Front', false),
(1, 'Node Server', false),
(1, 'Django Server',false),
(1, 'Friendship', false);

INSERT INTO packages (collection, name, version)
VALUES
(1, 'react-dom', '1.01'),
(1, 'react-popout', '1.21'),
(1, 'react-redux', '7.2.0'),
(1, 'sanitize.css', '11.0.0'),
(2, 'Node package', '3.0.0'),
(2, 'Node package', '3.0.0'),
(2, 'Node package', '3.0.0'),
(2, 'Node package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(4, 'dream team', '69.4.20');

