-- Up 

CREATE TABLE logs (
    id CHAR(36) NOT NULL,
    date DATETIME,
    work TEXT NOT NULL,
    exp TEXT NOT NULL,
    comp TEXT NOT NULL
);

INSERT INTO logs (id, date, work, exp, comp) VALUES
(
    '1',
    DATETIME('now'), --i do not know why it is inserting null
    'Welcome',
    'To your',
    'Placement diary :-)'
);

-- Down

DROP TABLE logs;