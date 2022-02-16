DROP TABLE IF EXISTS usersAdmin;
DROP TABLE IF EXISTS adminUsers;
DROP TABLE IF EXISTS validator;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS journal;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS adminSessions;

CREATE TABLE usersAdmin (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    keycode VARCHAR(255) NOT NULL,
    tel VARCHAR(255) UNIQUE,
    CONSTRAINT pk_usersAdmin PRIMARY KEY(id)
);


INSERT INTO `usersAdmin`(`username`, `email`, `fname`,`lname`,`pass`,`tel`) VALUES
(),
;


CREATE TABLE adminSessions (
    id INT NOT NULL AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL UNIQUE,
    dataSession JSON DEFAULT NULL,
    CONSTRAINT pk_usersAdmin PRIMARY KEY(id)
);

CREATE TABLE users (
    email VARCHAR(255),
    pass VARCHAR(255) NOT NULL,
    temp_pass VARCHAR(255),
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    birth_date DATETIME NOT NULL,
    state_user INT(255) DEFAULT '0',
    delivery INT DEFAULT 0,
    billing INT DEFAULT 0,
    address_user JSON DEFAULT NULL,
    cartItems JSON DEFAULT NULL,
    favorite JSON DEFAULT NULL,
    viewed JSON DEFAULT NULL,
    marketing JSON DEFAULT NULL,
    tel VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY(email)
);

CREATE TABLE validator (
   email VARCHAR(255) NOT NULL,
   code VARCHAR(255) NOT NULL,
   start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   validate_date DATETIME,
   CONSTRAINT pk_users_validator PRIMARY KEY(email),
   CONSTRAINT fk_users_validator_1 FOREIGN KEY(email)
      REFERENCES users(email) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;

CREATE TABLE orders (
   id INT NOT NULL AUTO_INCREMENT,
   emailUser VARCHAR(255) NOT NULL,
   providerID VARCHAR(255) NOT NULL,
   codeVerification VARCHAR(255) NOT NULL,
   buy_date DATETIME DEFAULT CURRENT_TIMESTAMP,
   validate_date DATETIME,
   delivery_date DATETIME,
   evaluated_date DATETIME,
   CONSTRAINT pk_emailUser_orders PRIMARY KEY(id),
   CONSTRAINT fk_users_orders FOREIGN KEY(emailUser)
      REFERENCES users(email) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE = InnoDB;


CREATE TABLE journal (
    id INT(255),
    boxname VARCHAR(255),
    title VARCHAR(255),
    category VARCHAR(255),
    auteur VARCHAR(255),
    url VARCHAR(255),
    description JSON DEFAULT NULL,
    photo JSON DEFAULT NULL,
    CONSTRAINT pk_journal PRIMARY KEY(id)
);

CREATE TABLE product (
    id INT(255),
    type VARCHAR(255),
    providerID VARCHAR(255),
    doc JSON DEFAULT NULL,
    CONSTRAINT pk_product PRIMARY KEY(id)
);





UPDATE users
SET cartItems = JSON_ARRAY_APPEND (cartItems, '$', 99)
WHERE email = 'andresvcc88@gmail.com';

UPDATE users
SET cartItems= '[]'
WHERE email = 'andresvcc88@gmail.com'

UPDATE users
SET cartItems= '[]'
WHERE email = 'andresvcc88@gmail.com'

UPDATE users
SET cartItems= JSON_REPLACE(cartItems,'$[0]','{"id":"2"}')
WHERE email = 'andresvcc88@gmail.com'

select cartItems from users where email = 'andresvcc88@gmail.com'

delete from users where email = 'alexiserne00@gmail.com'
delete from users where email = 'andresvcc88@gmail.com'
delete from users where email = 'gread-chogun@hotmail.com'
delete from users where email = 'andresvcc88@hotmail.com'
delete from users where email = 'comptemailspam00@gmail.com'