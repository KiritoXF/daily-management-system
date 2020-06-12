BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "originInfo" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"timeInterval"	TEXT,
	"weeks"	INTEGER,
	"coding"	REAL,
	"testing"	REAL,
	"documentWriting"	REAL,
	"selfStudying"	REAL,
	"translate"	REAL,
	"useless"	REAL,
	"weekWorkload"	REAL,
	"weekday"	INTEGER,
	"averageWorkload"	REAL,
	"workSaturation"	REAL,
	"weekData"	TEXT
);
COMMIT;
