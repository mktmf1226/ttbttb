const { sequelize } = require('./connection');
// const Department = require('./department');

const db = {};

db.sequelize = sequelize;

// model 생성
// db.Department = Department;

// 모델 init 자동 코드
Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

// 관계설정 자동 코드
// ['Department', 'User', 'Board', 'Post', '...']
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
