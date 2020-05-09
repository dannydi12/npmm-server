INSERT INTO users (email, password) 
VALUES
('demo@demo.com', 'demopassword');

INSERT INTO collections (user_id, collection_name)
VALUES
(1, 'React Front'),
(1, 'Node Server'),
(1, 'Django Server'),
(1, 'Friendship');

INSERT INTO packages (collection, name, version)
VALUES
(1, 'react-dom', '1.01'),
(1, 'react-popout', '1.21'),
(1, 'react-redux', '7.2.0'),
(1, 'sanitize.css', '11.0.0'),
(2, 'test data', '3.0.0'),
(2, 'test data', '3.0.0'),
(2, 'test data', '3.0.0'),
(2, 'test data', '3.0.0'),
(3, 'test data', '3.0.0'),
(3, 'test data', '3.0.0'),
(3, 'test data', '3.0.0'),
(3, 'test data', '3.0.0'),
(4, 'dream team', '69.4.20');

