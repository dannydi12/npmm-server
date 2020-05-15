
-- password is 'demopassword'
INSERT INTO users (email, password) 
VALUES
('demo@demo.com', '$2a$04$DjkbEZXF5djK5j/wgpjBY.vqOxiqvUk5tXUSlvwQIv0sOOmmFV/O6');

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
(2, 'Node package', '3.0.0'),
(2, 'Node package', '3.0.0'),
(2, 'Node package', '3.0.0'),
(2, 'Node package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(3, 'Django package', '3.0.0'),
(4, 'dream team', '69.4.20');

